document.getElementById('mobile-menu').addEventListener('click', function() {
    console.log('Menu burger cliqué !');  // Ligne de test
    const navLinks = document.getElementById('nav-links');
    const menuToggle = document.getElementById('mobile-menu');
    
    // Basculer l'état actif du menu burger et des liens de navigation
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Configuration API Airtable
const ACCESS_TOKEN = "patCXkaXvHjOSWG5v.7052af79bbd1295ba884789d8ab9376e3d79c71d9b571435ac21cff7d3bdb661"; // Votre jeton d'accès
const BASE_ID = "appAeViTSpJmhQouZ"; // ID de la base Dizale
const TABLE_PROJECTS_K = "tblD7EupxGjGF6ugK"; // ID pour Projets récents

// Fonction pour charger les projets récents
async function loadProjects() {
    const url = "https://api.airtable.com/v0/appAeViTSpJmhQouZ/tblD7EupxGjGF6ugK"; // L'URL complète pour les projets récents
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer patCXkaXvHjOSWG5v.7052af79bbd1295ba884789d8ab9376e3d79c71d9b571435ac21cff7d3bdb661`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const container = document.querySelector('.project-grid');
        container.innerHTML = ""; // Réinitialiser le contenu

        data.records.forEach((record, index) => {
            const fields = record.fields;
            const projectHTML = `
                <article class="project-item${index + 1}">
                    <h3 class="project">${fields.Type || "Catégorie non spécifiée"}</h3>
                    <img src="${fields.Image ? fields.Image[0].url : 'img/default-project.jpg'}" alt="${fields.Titre || "Image indisponible"}" loading="lazy">
                    <p class="project-description">${fields.Description || "Pas de description disponible."}</p>
                    <p class="projects">${fields.Titre || "Titre non spécifié"}</p>
                </article>
            `;
            container.innerHTML += projectHTML;
        });
    } catch (error) {
        console.error("Erreur lors du chargement des projets :", error);
    }
}

// Charger les données au démarrage
loadProjects();

//Diaporama

let currentIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
            dots[i].classList.toggle("active", i === index);
        });
    }

    document.querySelector(".next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    document.querySelector(".prev").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            currentIndex = i;
            showSlide(currentIndex);
        });
    });

//Bouton de retour vers le haut

document.addEventListener("DOMContentLoaded", function() {
    let backToTopButton = document.getElementById("backToTop");

    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };

    backToTopButton.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

