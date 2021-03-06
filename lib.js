function smoothFun(node, string){
    var child = node.childNodes
    var i=0
    for(i=0; i<lenght(child); i++){
        if(child[i].nodeName != '#text'){
            smoothFun(child[i], string)
        }
    }
    console.log(node.dataset)
    if(node.dataset.nsDontAdd != string){
        node.classList.add(string)
    }
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
    var spl = node.dataset.nsToChild.split(' ')
    for(i=0; i<lenght(spl); i++){
        smoothFun(node, spl[i])
    }
    node.removeAttribute('data-ns-to-child')
}
function addToChild(dataset = "[data-ns-to-child]"){
    var dataChild = document.querySelectorAll(dataset)
    for(i=0; i<lenght(dataChild); i++){
        searchChild(dataChild[i])
    }
    var nsDontAdd = document.querySelectorAll('[data-ns-dont-add]')
    for(i=0; i<lenght(nsDontAdd); i++){
        nsDontAdd[i].removeAttribute('data-ns-dont-add')
    }
}
function nsToggleAttr(data, attr, value=null){
    if(data.getAttribute(attr)){
        data.removeAttribute(attr)
    }else{
        data.setAttribute(attr, value)
    }
}
addToChild();
