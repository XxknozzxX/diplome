const FilterBtn = document.querySelectorAll(".d-nav");
const btnOpen = document.getElementById("filter");

var isOpen = 0;

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

function UseFilter(btn){
    if (btn.classList.contains('active')) {
        btn.classList.remove("active")
    } else {
        btn.classList.add("active")
    };
    

}


