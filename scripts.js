async function loadLang(path, language) {
    const response = await fetch(path);
    jsonData = await response.json();

    var language_nodes = document.querySelectorAll("[data-I18N]");
    language_nodes.forEach(element => {
        var key = element.getAttribute("data-I18N");
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

    try {
        const response = await fetch('/get-data-general');
        const data = await response.json();

        var language;
        switch(parseInt(data["lang"])){
            case 1: language = "pt"; break;
            case 2: language = "en"; break;
        }

        await loadLang("language.json", language);
    }
    catch (error) {
        await loadLang("language.json", "pt");
    }
}

function startSideBar() {
    var btn = document.getElementById("btn-mobile");
    var divBtn = document.getElementById("div-btn-mobile");
    const sideBar = document.getElementById("side-bar");
    btn.addEventListener("click", ()=>{
        sideBar.classList.toggle("hidden");
    });
    
    window.addEventListener("resize", ()=>{
        if (window.innerWidth >= 876) {
            sideBar.classList.remove("hidden");
            divBtn.classList.add("hidden");
        }
        else {
            sideBar.classList.add("hidden");
            divBtn.classList.remove("hidden");
        }
    });

    if (window.innerWidth < 876) {
        sideBar.classList.add("hidden");
        divBtn.classList.remove("hidden");
    }
}

function loading_screen(){
    document.body.style.overflow = "hidden";
    var loading_div = document.getElementById("loading");
    loading.classList.remove("hidden");
}

function spinner_by(spinner_id, element_id, activate){
    const spinner = document.getElementById(spinner_id);
    const element = document.getElementById(element_id);

    if (activate){
        spinner.classList.remove("hidden");
        element.classList.add("hidden");
    }
    else {
        spinner.classList.add("hidden");
        element.classList.remove("hidden");
    }
}