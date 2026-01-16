# Ochuko Samuel George Portfolio Website

A modern, responsive portfolio website showcasing my skills, projects, and professional experience as a Frontend & Mobile Application Developer.

## Features

### 🎨 Design Elements

- **Modern Color Scheme**: Light cream (#FFFFEB) background with dark navy blue (#1F2033) text and purple accents
- **Responsive Layout**: Fully responsive design that works on all devices from mobile to desktop
- **Smooth Animations**: Subtle animations enhance the user experience without being distracting
- **Custom Cursor**: Engaging interactive cursor that responds to user actions
- **Professional Typography**: Clean typography using DM Sans and Playfair Display Google Fonts

### 🛠️ Technical Features

- **Pure HTML, CSS, and JavaScript**: Built without frameworks for optimal performance
- **Intersection Observer API**: Efficient animations triggered when elements come into view
- **Dynamic Content Filtering**: Interactive project filtering system
- **Form Validation**: Client-side form validation for the contact form
- **Smooth Scrolling**: Enhanced navigation with smooth scrolling to sections
- **Semantic HTML**: Well-structured HTML for better accessibility and SEO

## Sections

1. **Hero Section**: Introduction with animated text slider
2. **About**: Personal information and professional summary
3. **Skills**: Technical skills categorized by domain
4. **Projects**: Portfolio of work with filterable categories
5. **Experience**: Professional timeline with detailed descriptions
6. **Certifications**: Professional certifications and education
7. **Contact**: Contact form and information

## Getting Started

1. Clone this repository
2. Replace placeholder images in the `assets/img` directory with your own
3. Edit the HTML content to customize with your personal information
4. Customize the color scheme in CSS if desired
5. Deploy to your preferred hosting platform

## Customization

### Changing Colors

The color scheme can be easily modified by changing the CSS variables in the `:root` selector in the `css/styles.css` file:

```css
:root {
  --color-primary: #7c3aed; /* Purple accent color */
  --color-primary-light: #9c69fd;
  --color-primary-dark: #6423d1;

  --color-light: #ffffeb; /* Light cream background */
  --color-dark: #1f2033; /* Dark navy blue text/elements */

  /* Additional color variables... */
}
```

### Adding Projects

To add a new project to the portfolio, add a new project card to the projects section following this structure:

```html
<div class="project-card" data-category="your-category">
  <div class="project-image">
    <img src="assets/img/your-project-image.jpg" alt="Project Name" />
    <div class="project-overlay">
      <a href="your-project-url" class="project-link"
        ><i class="fas fa-link"></i
      ></a>
      <a href="your-github-repo" class="project-link"
        ><i class="fab fa-github"></i
      ></a>
    </div>
  </div>
  <div class="project-info">
    <div class="project-tags">
      <span class="project-tag">Technology 1</span>
      <span class="project-tag">Technology 2</span>
      <span class="project-tag">Technology 3</span>
    </div>
    <h3 class="project-title">Project Name</h3>
    <p class="project-description">
      Brief description of the project and its impact.
    </p>
  </div>
</div>
```

## Browser Support

This portfolio website is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

This project is available for personal use. Please credit the original creator when using or modifying the code.

## Created By

Ochuko Samuel George - [LinkedIn](https://linkedin.com/in/ochuko-george) | [GitHub](https://github.com/ochuko1996)
