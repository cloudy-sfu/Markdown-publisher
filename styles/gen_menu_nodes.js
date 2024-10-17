function generate_node(article, level, show) {
    let node = `
        <li class="nav-item mb-2 d-flex justify-content-between" level="${level}" 
            style="line-height: calc(var(--bs-body-line-height)); ${show ? '' : 'display: none !important;'} ">
            <a ${article.filepath ? `href="javascript:article('${article.filepath}')"` : ''} 
                style="padding: 0.23rem ${level}rem;">
                ${article.name}
            </a> 
            ${article.sub ? `<a role="button" class="me-4" onclick="switch_sub(this)">${node_collapsed_triangle}</a>` : ''}
        </li>
    `;
    if (article.sub) {
        level++;
        for (let i = 0; i < article.sub.length; i++) {
            node += generate_node(article.sub[i], level, false);
        }
    }
    return node;
}

function generate_menu(articles_list) {
    let articles_html = '';
    const level = 0;
    for (let i = 0; i < articles_list.length; i++) {
        articles_html += generate_node(articles_list[i], level, true);
    }
    return articles_html;
}

const node_collapsed_triangle = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
</svg>
`;

const node_expanded_triangle = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"></path>
</svg>
`;

function switch_sub(button) {
    const expanded = button.innerHTML === node_expanded_triangle;
    const current_level = parseInt(button.parentNode.getAttribute('level'));
    let chapter = button.parentNode.nextElementSibling;
    while (chapter) {
        let level = parseInt(chapter.getAttribute('level'));
        if (isNaN(level) || level <= current_level) {
            break;
        } else if (level > current_level + 1) {
            chapter = chapter.nextElementSibling;
            continue;
        }
        if (expanded) {
            chapter.classList.remove('d-flex');
            chapter.style.display = "none";
        } else {
            chapter.classList.add('d-flex');
            chapter.style.display = "flex";
        }
        chapter = chapter.nextElementSibling;
    }
    if (expanded) {
        button.innerHTML = node_collapsed_triangle;
    } else {
        button.innerHTML = node_expanded_triangle;
    }
}
