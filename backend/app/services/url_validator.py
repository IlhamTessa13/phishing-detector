import requests
from urllib.parse import urlparse

TIMEOUT = 8
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}


def normalize_url(url: str) -> str:
    url = url.strip()
    parsed = urlparse(url)
    if not parsed.scheme:
        # 🆕 default ke https dulu, bukan http — mayoritas situs asli sekarang pakai https
        url = "https://" + url
    return url


def _try_request(url: str, method: str, verify: bool = True):
    fn = requests.head if method == "HEAD" else requests.get
    return fn(url, timeout=TIMEOUT, headers=HEADERS, allow_redirects=True, verify=verify)


def check_url_exists(url: str) -> tuple[bool, str, str]:
    """
    Return: (is_reachable, final_url, error_message)
    final_url = URL SUNGGUHAN setelah request/redirect (skema, www, dll akurat),
    BUKAN sekadar tebakan kita — ini yang dipakai untuk fitur, bukan input mentah user.
    """
    guess_url = normalize_url(url)
    parsed = urlparse(guess_url)

    if not parsed.netloc:
        return False, guess_url, "Format URL tidak valid."

    for method in ("HEAD", "GET"):
        try:
            resp = _try_request(guess_url, method)
            return True, resp.url, ""   # 🆕 pakai resp.url, bukan guess_url
        except requests.exceptions.SSLError:
            try:
                resp = _try_request(guess_url, method, verify=False)
                return True, resp.url, ""
            except requests.exceptions.RequestException:
                # 🆕 fallback: coba juga versi http:// murni sebelum menyerah
                if guess_url.startswith("https://"):
                    try:
                        http_url = guess_url.replace("https://", "http://", 1)
                        resp = _try_request(http_url, method)
                        return True, resp.url, ""
                    except requests.exceptions.RequestException:
                        continue
                continue
        except requests.exceptions.ConnectionError:
            if guess_url.startswith("https://"):
                try:
                    http_url = guess_url.replace("https://", "http://", 1)
                    resp = _try_request(http_url, method)
                    return True, resp.url, ""
                except requests.exceptions.RequestException:
                    continue
            continue
        except requests.exceptions.Timeout:
            continue
        except requests.exceptions.MissingSchema:
            return False, guess_url, "Format URL tidak valid."
        except requests.exceptions.InvalidURL:
            return False, guess_url, "URL tidak valid."
        except requests.exceptions.TooManyRedirects:
            return True, guess_url, ""
        except requests.exceptions.RequestException:
            continue

    return False, guess_url, "Website tidak ditemukan, domain tidak aktif, atau tidak merespons."