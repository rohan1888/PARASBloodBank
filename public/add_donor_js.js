function getData() {
    let fname = document.getElementById('fname').value;
    let mob = document.getElementById('mob').value;
    let email = document.getElementById('email').value;
    let age = document.getElementById('age').value;
    let gen = document.getElementById('gen').value;
    let bgroup = document.getElementById('bgroup').value;
    let addre = document.getElementById('addre').value;
    document.getElementById('form1').setAttribute("action",'/saved')
    
}