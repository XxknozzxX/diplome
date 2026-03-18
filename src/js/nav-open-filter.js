const filter = document.getElementById("filter");
const NavBtn = document.querySelectorAll(".nav_btn");
const FilterBtn = document.querySelectorAll(".btn_filtre");



var isOpen = 0;

function OpenFilter(){
    if (isOpen == 0) {
        NavBtn.forEach(el => {
            el.classList.add("d-nav");
        });
        filter.classList.add("active");

        FilterBtn.forEach(el => {
            el.classList.remove("d-nav");
        });

        const largeurs = [...FilterBtn].reduce((total, btn) => total + btn.offsetWidth, 0);
        console.log(largeurs);

        isOpen = 1;
    } else {
        NavBtn.forEach(el => {
            el.classList.remove("d-nav");
        });
        filter.classList.remove("active");

        FilterBtn.forEach(el => {
            el.classList.add("d-nav");
        });

        isOpen = 0;
    }
};


