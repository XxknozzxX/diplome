// Var Global
const Nbjour = 364
const firstJan = new Date(2025, 0, 1);
const largeur = document.documentElement.clientWidth;
const hauteurPage = document.documentElement.clientHeight;
const hauteurNav = document.getElementById("NavID");
const hauteur = hauteurPage - hauteurNav.offsetHeight
const wrap = document.getElementById("timeline_wrap");
var SizeJour = largeur / Nbjour


fetch("../src/db/db_2025.json")
  .then(response => response.json())
  .then(data => {

    const nbDeSaison = Object.values(data).flat().length


    Object.entries(data).forEach(([categorie, saisons]) => { 

        saisons.forEach(saison => {

            const type = saison.type;
            const start = saison.start;
            const end = saison.end;
            const nom = saison.nom;
            const zone = saison.zone;
            
            const { DateStart, DateEnd } = prsDate(start, end);

            const keepDateEnd = DateEnd;

            // résulta en ms
            // 1 jour = 86400000 ms
            var NbjourTotal = (DateEnd - DateStart) / 86400000;
            var decalage = (DateStart - firstJan) / 86400000;

            let div = document.createElement("div");
            wrap.append(div);
            div.classList.add("full_l");
            div.style.height = (hauteur / nbDeSaison) / hauteur * 100 + "%";

            let div2 = document.createElement("div");
            div.append(div2);
            div2.classList.add("saison_timeline");

            div2.style.marginLeft = (decalage / Nbjour) * 100 + "%";
            div2.style.width = (NbjourTotal / Nbjour) * 100 + "%";
            div2.style.height = 100 + "%";

            let p1 = document.createElement("p");
            let p2 = document.createElement("p");

            p1.classList.add("name_timeline");
            p2.classList.add("zone_timeline");

            div2.append(p1);
            div2.append(p2);

            p1.textContent = nom;
            p2.textContent = "["+zone+"]";

            // console.log((hauteur / nbDeSaison) / hauteur * 100 + "%")

            // if 2
            if (saison.start2 && saison.end2) {
                const start2 = saison.start2;
                const end2 = saison.end2;
                
                const { DateStart, DateEnd } = prsDate(start2, end2);

                NbjourTotal = (DateEnd - DateStart) / 86400000;
                decalage = (DateStart - keepDateEnd) / 86400000;
                
                let div3 = document.createElement("div");
                div.append(div3);
                div3.classList.add("saison_timeline");

                div3.style.marginLeft = (decalage / Nbjour) * 100 + '%';
                div3.style.width = (NbjourTotal / Nbjour) * 100 + "%";
                div3.style.height = 100 + "%";
            }
        
    });

    }); // fin new 


});


function prsDate(start, end) {
    const startUL = start.split(".");
    const ds = startUL[0];
    const ms = startUL[1] - 1;
    const ys = "20" + startUL[2];
    let DateStart = new Date (ys, ms, ds);

    const endUL = end.split(".");
    const de = endUL[0];
    const me = endUL[1] - 1;
    const ye = "20" + endUL[2];
    let DateEnd = new Date (ye, me, de);

    return { DateStart, DateEnd };
};

function checkbox() {
    const titre = document.getElementById("titre_timeline");
    const zone = document.getElementById("zone_timeline");
    const titre_p = document.querySelectorAll(".name_timeline");
    const zone_p = document.querySelectorAll(".zone_timeline");


    if(titre.checked == true){
        titre_p.forEach(el => {
            el.style.setProperty("display", "block", "important")
        });
    }else {
        titre_p.forEach(el => {
            el.style.setProperty("display", "none", "important")
        });
    }

    if(zone.checked == true){
        zone_p.forEach(el => {
            el.style.setProperty("display", "block", "important")
        });
    }else {
        zone_p.forEach(el => {
            el.style.setProperty("display", "none", "important")
        });
    }


};