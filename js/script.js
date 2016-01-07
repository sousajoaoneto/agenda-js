/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 //criando seletor "global" atribuindo a $
 //uso: $("seletor")
var $ = function(seletor){
    return document.querySelector(seletor);

    /*
    var elements = document.querySelectorAll(seletor);
    if(elements.length > 1 )
        var e = elements;
    else
        var e = document.querySelector(seletor);
    return e;
    */
};
Element.prototype.append = function(e){
    this.appendChild(e);
}
Element.prototype.fontColor = function(color){
    this.style.color = color;
}
NodeList.prototype.fontColor = function(rgb){
    for(var i in this){
        this[i].style.color = rgb;
        console.log(this[i]);
    }
}

//function get posicao do click
function getCp(event) {
    var clickPositon = {
        xp : event.clientX,
        yp : event.clientY
    }
    return clickPositon;
}


//contacts object
var contacts = [];
if(localStorage.contacts){
    //get contact list
    contacts = JSON.parse(localStorage.contacts);
}

function getId(){
    var id;
    if(localStorage.current_id){
        //get current_id
        id = localStorage.current_id;
        id++;
    }else{
        id = 1;
    }
    localStorage.current_id = id;//armazenando current_id
    return id;
}

function list(){
    //visivilidade de sessoes
    $("#sec_list").style.display = "block";
    $("#sec_show").style.display = "none";
    $("#sec_form").style.display = "none";
    $(".overlay").style.display = "none";
        
    $("#sec_list").innerText = "";
    
    //iniciando a rotina de listagem
    
    if(contacts.length > 0){
        var contact;
        for (contact in contacts){
            var id = contacts[contact].id;
            var nome = contacts[contact].firstName;
            var sobrenome = contacts[contact].lastName;
            var url_foto = contacts[contact].urlPhoto;
            
            var article = document.createElement("article");
            article.setAttribute('class','contato');
            article.setAttribute('onclick','show('+id+')');
            var image = document.createElement("img");
            if(url_foto)
                image.setAttribute('src', url_foto);
            else
                image.setAttribute('src','images/user.png');           
            
            //image.setAttribute('src','images/jj.jpg');  
            var div = document.createElement("div");
            div.innerHTML = "<strong>" + nome + "</strong> <span>" + sobrenome + "</span>";
            article.appendChild(image);
            article.appendChild(div);
            $("#sec_list").appendChild(article);
        }
        /*
        console.log($("#sec_list"));
        $("#sec_list").fontColor("#f00");
        console.log($(".contato"));
        $(".contato").fontColor("#f00");
        */
    }else{
        $("#sec_list").innerHTML = "<h1>Nenhum contato na lista</h1>";
    }
}

//mostrar contato
function show(contato){
        //$("#sec_list").style.display = "none";
        $("#sec_form").style.display = "none";
        $("#sec_show").style.display = "block";
        $(".overlay").style.display = "block";
        
        $("#sec_list").onclick = function(){
            var clickPositon = getCp(event);
            //console.log(clickPositon);
        }

        if(contacts.length > 0){
        var contact;
        for (contact in contacts){
            var contato_o = contacts[contact];
            var id = contato_o.id;
            if(id == contato){
            var nome = contato_o.firstName;
            var sobrenome = contato_o.lastName;
            var email = contato_o.email;
            var telefone = contato_o.phone;
            var aniversario = contato_o.birth;
            var endereco = contato_o.address;
            var url_foto = contato_o.urlPhoto;
            
            //colocando usuario mostrado na sessao
            sessionStorage.id = id;
            sessionStorage.firstName = nome;
            sessionStorage.lastName = sobrenome;
            sessionStorage.email = email;
            sessionStorage.phone = telefone;
            sessionStorage.birth = aniversario;
            sessionStorage.address = endereco;
            sessionStorage.urlPhoto = url_foto;
            

            //mostrando na página
            var image = $("#sec_show .image");
            var img;
            if(url_foto != "")
                img = url_foto.replace(/\\/g,"/");
            else
                img = "images/user.png";

            image.setAttribute('style', 'background-image: url(\'' + img + '\');');

            $("#sec_show #nm").innerHTML = nome;
            $("#sec_show #snm").innerHTML = sobrenome;
            $("#sec_show #em").innerHTML = "<i class=\"fa fa-envelope-o\"></i> " + email;
            $("#sec_show #tl").innerHTML = "<i class=\"fa fa-phone\"></i> " + telefone;
            $("#sec_show #an").innerHTML = "<i class=\"fa fa-birthday-cake\"></i> " + aniversario;
            $("#sec_show #ed").innerHTML = "<i class=\"fa fa-map-marker\"></i> " + endereco;
            $("#sec_show .btn-default").setAttribute("onclick","list()");
            $("#sec_show .btn-danger").setAttribute("onclick","del()");

            }
        }
    }else{
        $("#sec_show").innerHTML = "<h1>Nenhum contato na lista</1>";
    }
}

//deletar contato
function del(){
    var confirmDel = confirm("Deseja remover " + sessionStorage.firstName + " dos contatos?");
    if(confirmDel){
        if(contacts.length > 0){
            var contact;
            for (contact in contacts){
                var contato_o = contacts[contact];
                if( contato_o.id == sessionStorage.id ){
                    contacts.splice(contact, 1);
                    localStorage.contacts = JSON.stringify(contacts);
                    list();
                }
            }
        }
    }
}
function cancelar(){
    list();
    var contato = sessionStorage.id;
    show(contato);
}
function search(){

    //visivilidade de sessoes
    $("#sec_list").style.display = "block";
    $("#sec_show").style.display = "none";
    $(".overlay").style.display = "none";
    $("#sec_form").style.display = "none";

    $("#sec_list").innerText = "";

    //iniciando a rotina de busca e listagem
                
                var busca = this.busca.value;

                if(contacts.length > 0){
                    var cont = 0;
                    var contact;
                    for (contact in contacts){
                        var id = contacts[contact].id;
                        var nome = contacts[contact].firstName;
                        var sobrenome = contacts[contact].lastName;
                        var url_foto = contacts[contact].urlPhoto;
                        var nomeCompleto = nome+" "+sobrenome;
                        //testando se a string digitada estam em nome ou sobrenome
                        if((nome.toLowerCase()).indexOf(busca.toLowerCase()) != -1 || (sobrenome.toLowerCase()).indexOf(busca.toLowerCase()) != -1
                            || (nomeCompleto.toLowerCase()).indexOf(busca.toLowerCase()) != -1){                        
                            
                            var article = document.createElement("article");
                            article.setAttribute('class','contato');
                            article.setAttribute('onclick','show('+id+')');
                            var image = document.createElement("img");
                            if(url_foto != "")
                                image.setAttribute('src', url_foto);
                            else
                                image.setAttribute('src','images/user.png');           
                            
                            //image.setAttribute('src','images/jj.jpg');  
                            var div = document.createElement("div");
                            div.innerHTML = "<strong>" + nome + "</strong> <span>" + sobrenome + "</span>";
                            article.appendChild(image);
                            article.appendChild(div);
                            $("#sec_list").appendChild(article);

                            cont++;
                        }
                        
                    }
                    if(cont == 0){
                        $("#sec_list").innerHTML = "<h1>Nenhum contato encontrado para " + busca + "</h1>";
                    }
                }else{
                    $("#sec_list").innerHTML = "<h1>Nenhum contato na lista</h1>";
                }
}
window.onload = function(){
    list();
    
    $(".overlay").onclick = function(){
        list();
    }

    $(".list").onclick = function(){
        list();
    };
    
    $(".cad").onclick = function(){
        //visivilidade de sessoes
        $("#sec_list").style.display = "none";
        $("#sec_form").style.display = "block";
        $("#sec_show").style.display = "none";
        
        $("#sec_form form").setAttribute("id","create");
        $("#sec_form form").setAttribute("class","create");
        
        //limpando formulario 
        document.formulario.reset();

        $("#sec_form form header > h1").innerHTML = "Novo Contato";//title
        $("#sec_form form button").innerHTML = "Cadastrar";//title btn submit

        //iniciando a rotina de cadastro
        var formCreate = $("form.create");
        if(formCreate){
            formCreate.onsubmit = function(){
                //recebendo id
                var id = getId();
                
                var contact = {
                    id : id,
                    firstName : this.nome.value,
                    lastName : this.sobrenome.value,
                    email : this.email.value,
                    phone : this.telefone.value,
                    birth : this.aniversario.value,
                    address : this.endereco.value,
                    urlPhoto : this.url_foto.value
                };

                contacts.push(contact);

                //set contact list
                var insert = localStorage.contacts = JSON.stringify(contacts);
                
                show(contact.id);                
                
                return false;
            };
        }
    };//FIM CAD  
    
    
    //ALTERAR DADOS
    //editar contato
    var edit = $(".edit");
    if(edit){
        edit.onclick = function(){
            $("#sec_list").style.display = "none";
            $("#sec_show").style.display = "none";
            $("#sec_form").style.display = "block";
            $(".overlay").style.display = "none";

            $("#sec_form form").setAttribute("id","edit");
            $("#sec_form form").setAttribute("class","edit");

            $("#sec_form form header > h1").innerHTML = "Editar Contato";//title
            $("#sec_form form button").innerHTML = "<i class=\"fa fa-refresh\"></i> Alterar";//title btn submit

            //limpando dados do formulario
            document.formulario.reset();
            //recuperando dados da sessao e inserindo no formulario
            $("#sec_form form #nome").value = sessionStorage.firstName;
            $("#sec_form form #sobrenome").value = sessionStorage.lastName; 
            $("#sec_form form #email").value = sessionStorage.email; 
            $("#sec_form form #telefone").value = sessionStorage.phone; 
            $("#sec_form form #aniversario").value = sessionStorage.birth; 
            $("#sec_form form #endereco").value = sessionStorage.address; 
            $("#sec_form form #url_foto").value = sessionStorage.urlPhoto;

            //iniciando a rotina de edicao
            var formEdit = $("form.edit");
            if(formEdit){
                formEdit.onsubmit = function(){
                    if(contacts.length > 0){
                        var contact;
                        for (contact in contacts){
                            var contato_o = contacts[contact];
                            if( contato_o.id == sessionStorage.id ){
                                console.log("Entrou");
                                contato_o.firstName = this.nome.value;
                                contato_o.lastName = this.sobrenome.value;
                                contato_o.email = this.email.value;
                                contato_o.phone = this.telefone.value;
                                contato_o.birth = this.aniversario.value;
                                contato_o.address = this.endereco.value;
                                contato_o.urlPhoto = this.url_foto.value;
                                    
                                localStorage.contacts = JSON.stringify(contacts);//colocando usuario cadastrado na sessao
                                    
                                sessionStorage.firstName = contato_o.firstName;
                                sessionStorage.lastName = contato_o.lastName;
                                sessionStorage.email = contato_o.email;
                                sessionStorage.phone = contato_o.phone;
                                sessionStorage.birth = contato_o.birth;
                                sessionStorage.address = contato_o.address;
                                sessionStorage.urlPhoto = contato_o.urlPhoto;


                                list();
                                show(sessionStorage.id);
                            }
                        }
                    }

                    return false;
                };
            }
        }
    }//fim edit

    
    $(".open-search").onclick = function(){
        $("form.search input").style.display = "block";
        $("form.search .btn").style.display = "block";
        $("form.search .close-search").style.display = "block";
        $("form.search").setAttribute("class","search opened");
        $("form.search #busca").setAttribute("autofocus","");        
        $(".page-title").style.display = "none";
    };

    $(".close-search").onclick = function(){
        $("form.search").setAttribute("class","search");
        $(".page-title").style.display = "block";
        $("form.search input").style.display = "none";
        //limpando formulario de busca
        document.form_search.reset();
        $("form.search .btn").style.display = "none";
        $("form.search #busca").removeAttribute("autofocus");
        this.style.display = "none";
        list();
    };

    //BUSCA
     var formBusca = $("form.search");
        if(formBusca){
            formBusca.onsubmit = function(){
                
                search();

                //limpando formulario de busca
                document.form_search.reset();

                return false;
            };
            
            ControlTimer();

            formBusca.busca.onchange = function(){                
                search();
            };
        }// fim if busca



    $(".cancelar").onclick = function(){
        cancelar();
    };
};//fim window.onload

/*busca rapida*/
var strNew = document.form_search.busca.value;
var strOld = document.form_search.busca.value;  
  
function ControlTimer(){
    strNew = document.form_search.busca.value;  
    if(strNew!=strOld){  
        search(); 
    }  
    strOld = strNew;
    setTimeout("ControlTimer()",100);
}