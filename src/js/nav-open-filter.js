// global var
const FilterBtn = document.querySelectorAll(".d-nav");
const btnOpen = document.getElementById("filter");
const nb = document.getElementById("span_nb_filter");

var counts = { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0 }

var isOpen = 0;
var nbActiveFilter = 0;

function OpenFilter(){
    if (isOpen == 0) {
        FilterBtn.forEach(el => {
            el.classList.add("open");
        });
        btnOpen.classList.add("open");
        isOpen = 1;
    } else {
        FilterBtn.forEach(el => {
            el.classList.remove("open");
        });
        btnOpen.classList.remove("open");
        isOpen = 0;
    }
};

function UseFilter(btn, id){
    if (btn.classList.contains('active')) {
        // close
        btn.classList.remove("active")
        nbActiveFilter --;
    } else {
        // open
        btn.classList.add("active")
        nbActiveFilter ++;
    };

    nb.textContent = nbActiveFilter;
    applyFilters(id)
}

function applyFilters(id) {
    // var function
    let activeID = counts[id] 
    

    if(activeID == 0){
        counts[id]++
        activeID = counts[id]
    } else {
        counts[id]--
        activeID = counts[id]
    }

    if (Object.values(counts).every(v => v == 0)) {
        for (let i = 1; i <= 9; i++) {
            document.querySelectorAll(".id" + i).forEach(el => el.classList.remove("hide"))
        }
    } else {
        for (let i = 1; i <= 9; i++) {
            if (counts[i] == 0) {
                document.querySelectorAll(".id" + i).forEach(el => el.classList.add("hide"))
            } else {
                document.querySelectorAll(".id" + i).forEach(el => el.classList.remove("hide"))
            }
        }
    }

    recalcHauteur();
};