async function loadLang(path, language) {
    const response = await fetch(path);
    jsonData = await response.json();

    var language_nodes = document.querySelectorAll("[data-I18N]");
    language_nodes.forEach(element => {
        var key = element.getAttribute("data-I18N");
        console.log(element);
        if (element.nodeName === "INPUT"){
            element.placeholder = jsonData[language][key];
        }
        else {
            element.innerHTML = jsonData[language][key];
        }
    });
}

async function loadExternal(){
	
    const sideBar = await fetch("side-bar.html");
    const sideBarContent = await sideBar.text();
    
    const topBar = await fetch("top-bar.html");
    const topBarContent = await topBar.text();
    
    document.getElementById("side-bar").innerHTML = sideBarContent;
    document.getElementById("top-bar").innerHTML = topBarContent;

    startSideBar();

    await loadLang("language.json", "pt");
}

function startSideBar() {
    var btn = document.getElementById("btn-mobile");
    const sideBar = document.getElementById("side-bar")
    btn.addEventListener("click", ()=>{
        sideBar.classList.toggle("hidden");
    });
    
    window.addEventListener("resize", ()=>{
        if (window.innerWidth >= 876) {
            sideBar.classList.remove("hidden");
        }
        else {
            sideBar.classList.add("hidden");
        }
    });

    if (window.innerWidth < 876) {
        sideBar.classList.add("hidden");
    }
}

function loading_screen(){
    document.body.style.overflow = "hidden";
    var loading_div = document.getElementById("loading");
    loading.classList.remove("hidden");
}