import re
import math
from collections import Counter
from urllib.parse import urlparse

FEATURE_ORDER = [
    "urllength", "hasipaddress", "dotcount", "httpsflag",
    "urlentropy", "tokencount", "subdomaincount", "queryparamcount",
    "tldlength", "pathlength", "hyphenindomain", "numberofdigits",
    "tldpopularity", "suspiciousfileextension", "domainnamelength",
    "percentagenumericchars",
]

POPULAR_TLDS = {
    "ac","academy","actor","ad","ae","aero","af","africa","ag","ai","al","am",
    "amazon","ao","app","apple","aq","ar","arpa","art","as","asia","at","au",
    "auction","audi","audio","autos","aws","ax","az","ba","baby","bar",
    "basketball","bd","be","beauty","beer","best","bet","bf","bg","bh","bi",
    "bid","bike","bingo","bio","biz","bj","black","blog","blue","bn","bo",
    "boats","bond","boston","bot","box","br","bradesco","bs","bt","build",
    "business","buzz","bw","by","bz","ca","cab","cafe","cam","camera",
    "capital","car","care","casa","cash","casino","cat","cc","cd","center",
    "ceo","cern","cf","cfd","cg","ch","chat","chrome","ci","city","cl","click",
    "clinic","cloud","club","cm","cn","co","com","community","company","cool",
    "coop","courses","cr","credit","cu","cv","cx","cy","cymru","cyou","cz",
    "dad","dating","day","de","delivery","desi","dev","dhl","digital","direct",
    "directory","dj","dk","dm","do","domains","download","dz","earth","ec",
    "edeka","edu","ee","eg","email","energy","engineering","es","et","eu",
    "eus","events","exchange","expert","fail","faith","family","fans","farm",
    "fi","finance","fit","fj","fm","fo","food","forum","foundation","fox","fr",
    "fujitsu","fun","futbol","fyi","ga","gal","gallery","game","games",
    "garden","gd","gdn","ge","gf","gg","gh","gi","gl","gle","global","globo",
    "gm","gmbh","godaddy","gold","golf","goog","google","gov","gp","gr",
    "green","group","gs","gt","guru","gy","hair","haus","health","help","hk",
    "hn","homes","honda","horse","host","hosting","hot","how","hr","ht","hu",
    "icu","id","ie","il","im","in","inc","info","ing","ink","insure","int",
    "international","io","iq","ir","is","ist","istanbul","it","je","jetzt",
    "jo","jobs","jp","ke","kg","kh","ki","kitchen","koeln","kr","kw","kz","la",
    "land","lat","law","lb","leclerc","legal","li","life","limited","limo",
    "link","live","living","lk","llc","locker","lol","london","love","ls",
    "lt","ltd","lu","luxe","lv","ly","ma","madrid","makeup","management",
    "market","marketing","markets","md","me","med","media","meme","men",
    "menu","mg","microsoft","mil","mk","ml","mn","mo","mobi","moe","mom",
    "money","monster","motorcycles","mov","movie","mp","ms","mt","mu",
    "museum","mv","mw","mx","my","mz","na","name","navy","nc","ne","nec",
    "net","network","new","news","nf","ng","nhk","ni","ninja","nl","no","now",
    "nr","nrw","nu","nz","om","one","onl","online","ooo","org","ovh","pa",
    "page","paris","partners","parts","party","pe","pf","ph","phd","photo",
    "photos","pics","pictures","pink","pk","pl","place","plus","pm","pn",
    "porn","pr","press","pro","promo","ps","pt","pub","pw","py","qa","qpon",
    "quest","re","realestate","realtor","red","reisen","rent","report","rest",
    "rip","ro","rocks","rodeo","rs","ru","run","rw","sa","sale","sap","sarl",
    "saxo","sb","sbs","sc","school","science","scot","se","security",
    "services","sex","sg","sh","sharp","shop","shopping","show","si","site",
    "sk","ski","skin","sm","sn","so","soccer","social","software","solutions",
    "soy","space","sport","sr","ss","st","statefarm","store","stream",
    "studio","study","su","support","surf","sv","sx","sy","systems","tax",
    "taxi","tc","team","tech","technology","tel","tg","th","tips","tk","tl",
    "tm","tn","to","today","tokyo","tools","top","town","toyota","tr","trade",
    "travel","tt","tube","tv","tw","tz","ua","ug","uk","uno","uol","us","uy",
    "uz","va","vc","ve","ventures","vet","vg","vi","video","vin","vip","vn",
    "vote","vu","wales","watch","website","wf","wiki","win","work","works",
    "world","ws","wtf","xin","xn--p1ai","xxx","xyz","yandex","ye","you",
    "youtube","zip","zm","zone","zw",
}

SUSPICIOUS_EXTENSIONS = {"html", "htm", "php", "php5", "jsp", "js", "docx", "bat", "pdf"}


def extract_features(url: str) -> dict:
    parsed = urlparse(url if "://" in url else "http://" + url)
    host = parsed.netloc.split(":")[0]
    host_parts = host.split(".")

    urllength = len(url)
    hasipaddress = int(bool(re.match(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$", host)))
    dotcount = url.count(".")
    httpsflag = int(parsed.scheme == "https")

    n = len(url)
    counts = Counter(url)
    urlentropy = -sum((c / n) * math.log2(c / n) for c in counts.values()) if n else 0.0

    tokens = [t for t in re.split(r"[/.\-_?=&:#@]+", url) if t]
    tokencount = len(tokens)

    subdomaincount = max(0, len(host_parts) - 2)
    queryparamcount = len([q for q in parsed.query.split("&") if q]) if parsed.query else 0

    tld = host_parts[-1] if host_parts else ""
    tldlength = len(tld)
    pathlength = len(parsed.path)
    hyphenindomain = int("-" in host)
    numberofdigits = sum(c.isdigit() for c in url)
    tldpopularity = int(tld.lower() in POPULAR_TLDS)

    ext_match = re.search(r"\.([a-zA-Z0-9]+)$", parsed.path)
    ext = ext_match.group(1).lower() if ext_match else ""
    suspiciousfileextension = int(ext in SUSPICIOUS_EXTENSIONS)

    domainnamelength = len(host_parts[-2]) if len(host_parts) >= 2 else len(host)
    percentagenumericchars = (numberofdigits / n * 100) if n else 0.0

    return {
        "urllength": urllength, "hasipaddress": hasipaddress, "dotcount": dotcount,
        "httpsflag": httpsflag, "urlentropy": urlentropy, "tokencount": tokencount,
        "subdomaincount": subdomaincount, "queryparamcount": queryparamcount,
        "tldlength": tldlength, "pathlength": pathlength, "hyphenindomain": hyphenindomain,
        "numberofdigits": numberofdigits, "tldpopularity": tldpopularity,
        "suspiciousfileextension": suspiciousfileextension, "domainnamelength": domainnamelength,
        "percentagenumericchars": percentagenumericchars,
    }