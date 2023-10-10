const columnLoob = document.getElementById("column-loob");

columnLoob.addEventListener("click", () => {
    console.log("clicked on loob")
    columnLoob.classList.add("rotate");
    setTimeout(() => {
        console.log("removing rotate")
        columnLoob.classList.remove("rotate");
    }, 2000);
});
