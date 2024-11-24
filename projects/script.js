$(document).ready(function () {
    // Toggle menu visibility on click
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Handle scroll and load events
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // Show or hide the scroll-top button
        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }
    });
});

// Handle tab visibility change
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Portfolio Varun";
        $("#favicon").attr("href", "/assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "/assets/images/favhand.png");
    }
});

// Fetch projects from JSON
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => data);
}

// Function to display projects based on new JSON structure
function showProjects(projects) {
    const projectsContainer = document.querySelector('.work .box-container');
    let projectsHTML = '';

    projects.forEach(project => {
        projectsHTML += `
            <div class="grid-item ${project.category.toLowerCase().replace(' ', '-')}" style="width: 380px; margin: 1rem">
                <div class="box tilt">
                    <!-- Project Image or Video -->
                    <div class="carousel-item">
                        ${generateProjectVisuals(project.visuals)}
                    </div>

                    <div class="content">
                        <!-- Project Title and Overview -->
                        <h3>${project.title}</h3>
                        <h4>Project Overview</h4>
                        <p>${project.overview}</p>

                        <!-- Methodology and Technical Details -->
                        ${project.methodology ? `<h4>Methodology</h4><p>${project.methodology}</p>` : ''}
                        ${project.cnn_architecture ? `
                            <h4>CNN Architecture</h4>
                            <ul>
                                ${project.cnn_architecture.map(item => `<li>${item}</li>`).join('')}
                            </ul>` : ''}

                        ${project.transfer_learning ? `<h4>Transfer Learning</h4><p>${project.transfer_learning}</p>` : ''}
                        ${project.training_process ? `<h4>Training Process</h4><p>${project.training_process}</p>` : ''}
                        ${project.applications ? `<h4>Applications</h4><p>${project.applications}</p>` : ''}

                        <!-- Key Technologies Used -->
                        <h4>Key Technologies Used</h4>
                        <ul>
                            ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                        </ul>

                        <!-- Third-Party Libraries -->
                        ${project.libraries ? `
                            <h4>Third-Party Libraries</h4>
                            <ul>
                                ${project.libraries.map(lib => `
                                    <li>
                                        <a href="${lib.url}" target="_blank">${lib.name}</a>
                                    </li>`).join('')}
                            </ul>` : ''}

                        <!-- Action Buttons -->
                        <div class="btns">
                            <a href="#" class="btn">
                                <i class="fas fa-eye"></i> View
                            </a>
                            <a href="#" class="btn">
                                Code <i class="fas fa-code"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    projectsContainer.innerHTML = projectsHTML;
}

// Helper function to generate project visuals (images/videos)
function generateProjectVisuals(visuals) {
    return visuals.map(visual => {
        if (visual.type === 'video') {
            return `
                <div class="carousel-image-container">
                    <video controls>
                        <source src="${visual.src}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <p>${visual.alt}</p>
                </div>`;
        } else if (visual.type === 'image') {
            return `
                <div class="carousel-image-container">
                    <img src="${visual.src}" alt="${visual.alt}" />
                    <p>${visual.alt}</p>
                </div>`;
        }
    }).join('');
}

// Initialize isotope filter
const $grid = $('.box-container').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows',
    masonry: {
        columnWidth: 200
    }
});

// Filter items on button click
$('.button-group').on('click', 'button', function () {
    $('.button-group').find('.is-checked').removeClass('is-checked');
    $(this).addClass('is-checked');
    const filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
});

// Fetch and display projects
getProjects().then(data => {
    showProjects(data);
});