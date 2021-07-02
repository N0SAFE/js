var dataChild = document.querySelectorAll('[data-to-child]')
function smoothFun(node, string){
    var child = node.childNodes
    var i=1
    while(i<lenght(child)){
        smoothFun(child[i], string)
        i+=2
    }
    node.classList.add(string)
}
function lenght(x){
    var lenght = 0
    Array.from(x).forEach((element, index) =>
    {
        lenght++
    })
    return lenght;
}
function searchChild(node){
    var spl = node.dataset.toChild.split(' ')
    for(i=0; i<lenght(spl); i++){
        smoothFun(node, spl[i])
    }
    node.removeAttribute('data-to-child')
}
for(i=0; i<lenght(dataChild); i++){
    searchChild(dataChild[i])
}