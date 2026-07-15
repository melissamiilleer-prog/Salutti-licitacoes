/* ==========================================================
        SALUTTI EMPRESARIAL
        JavaScript
==========================================================*/

/*==============================
    MENU MOBILE
==============================*/

const menu = document.querySelector(".menu");

const botaoMenu = document.querySelector(".menu-mobile");

botaoMenu.addEventListener("click", () => {

    menu.classList.toggle("ativo");

});

/*==============================
    FECHAR MENU AO CLICAR
==============================*/

document.querySelectorAll(".menu a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("ativo");

    });

});

/*==============================
    HEADER SCROLL
==============================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.style.height = "75px";

        header.style.background = "#0F1E29";

        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.15)";

    }

    else{

        header.style.height = "90px";

        header.style.background = "#13212B";

        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.12)";

    }

});

/*==============================
    SCROLL SUAVE
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        if(destino){

            destino.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/*==============================
    ANIMAÇÃO AO ROLAR
==============================*/

const elementos = document.querySelectorAll(

".card, .card-servico, .etapa, .item-contato, .hero-texto, .hero-imagem, .quem-texto, .quem-imagem"

);

const aparecer = () => {

    elementos.forEach(item => {

        const topo = item.getBoundingClientRect().top;

        const tela = window.innerHeight - 120;

        if(topo < tela){

            item.style.opacity = "1";

            item.style.transform = "translateY(0)";

        }

    });

};

elementos.forEach(item => {

    item.style.opacity = "0";

    item.style.transform = "translateY(40px)";

    item.style.transition = ".8s ease";

});

window.addEventListener("scroll", aparecer);

window.addEventListener("load", aparecer);

/*==============================
    MENU ATIVO
==============================*/

const secoes = document.querySelectorAll("section");

const links = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {

    let atual = "";

    secoes.forEach(secao => {

        const topo = secao.offsetTop - 180;

        const altura = secao.offsetHeight;

        if(scrollY >= topo){

            atual = secao.getAttribute("id");

        }

    });

    links.forEach(link => {

        link.classList.remove("ativo");

        if(link.getAttribute("href") === "#" + atual){

            link.classList.add("ativo");

        }

    });

});

/*==============================
    BOTÃO WHATSAPP
==============================*/

const whatsapp = document.querySelector(".whatsapp-fixo");

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        whatsapp.style.opacity="1";

        whatsapp.style.pointerEvents="auto";

    }

    else{

        whatsapp.style.opacity="0";

        whatsapp.style.pointerEvents="none";

    }

});

/*==============================
        FINAL
==============================*/

console.log("SALUTTI Empresarial carregado com sucesso.");