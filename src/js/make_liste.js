// Var Global
const wrap = document.getElementById("liste_wrap");
let sectionID = 0

fetch("../src/db/db_2025.json")
  .then(response => response.json())
  .then(data => {

    Object.entries(data).forEach(([categorie, saisons]) => { 
        
        sectionID ++;
        // titre
        let div = document.createElement("div");
        wrap.append(div);
        div.classList.add("liste_el_titre");
        div.classList.add("id" + sectionID);
        let p1 = document.createElement("p");
        div.append(p1)
        p1.textContent = categorie;

        // objet de base
        saisons.forEach(saison => { 
          let a = document.createElement("a");
          wrap.append(a);
          a.classList.add("liste_el");
          a.classList.add("id" + sectionID);

          let child = document.createElement("div");
          a.append(child);
          child.classList.add("liste_sz");

          let p1 = document.createElement("p");
          let p2 = document.createElement("p");
          child.append(p1, p2)
          p1.classList.add("saison_liste");
          p2.classList.add("zone_liste");

          let child2 = document.createElement("div");
          a.append(child2);

          let p3 = document.createElement("p");
          child2.append(p3)
          p3.classList.add("date_liste");


          // met les info
          const start = saison.start;
          const end = saison.end;
          const start2 = saison.start2;
          const end2 = saison.end2;
          const nom = saison.nom;
          const zone = saison.zone;
          
          p1.textContent = nom;
          p2.textContent = zone;
          p3.textContent = start + " - " + end;

          a.setAttribute('href', '#');
        });

    });

});