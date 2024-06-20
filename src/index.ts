// Function to process the rich text
function processRichText(richTextId, linksListId) {
  const richTextElement = document.getElementById(richTextId);
  const richTextContent = richTextElement.innerHTML;

  // Find all instances of [[link]] tags and extract the content
  const linkRegex = /\[\[link\]\](.*?)\[\[link\]\]/g;
  let match;
  const linkContents = [];

  while ((match = linkRegex.exec(richTextContent)) !== null) {
    linkContents.push(match[1]);
  }

  // Create a table of links at the beginning of the rich text
  const linksDivElement = document.getElementById(linksListId);
  linkContents.forEach((content, index) => {
    const linkDiv = document.createElement('div');
    linkDiv.className = 'anchor-list-item u-paragraph-small';
    linkDiv.innerHTML = `<a href="#link${index}">${content}</a>`;
    linksDivElement.appendChild(linkDiv);
  });

  // Replace every two [[link]] tags with an anchor tag and wrap the content with <h2>
  let updatedRichTextContent = richTextContent;
  linkContents.forEach((content, index) => {
    const anchorTag = `<a class="no_underline" id="link${index}" name="link${index}"></a><h2>${content}</h2>`;
    updatedRichTextContent = updatedRichTextContent.replace(
      `[[link]]${content}[[link]]`,
      anchorTag
    );
  });

  // Update the rich text content with the anchors
  richTextElement.innerHTML = updatedRichTextContent;
}

// Function to make images clickable and open in a lightbox
function makeImagesClickable(container) {
  const images = container.getElementsByTagName('img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close-test');

  Array.from(images).forEach((image) => {
    image.style.cursor = 'pointer';
    image.addEventListener('click', () => {
      lightboxImage.src = image.src;
      lightbox.style.display = 'flex';
      lightbox.style.justifyContent = 'center';
      lightbox.style.alignItems = 'center';
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
}

function addPrefixToRichText(elementId, prefix, prefixColor) {
  const richTextElement = document.getElementById(elementId);

  if (richTextElement) {
    const paragraphs = richTextElement.getElementsByTagName('p');

    for (const paragraph of paragraphs) {
      // Ensure an 8px margin between paragraphs
      paragraph.style.marginBottom = '8px';
      // Add the prefix with a 12px gap
      paragraph.innerHTML = `<span style="color: ${prefixColor}; display: inline-block; width: 18px; height: 18px; font-size: 18px; margin-right: 12px; line-height: 18px; text-align: center;">${prefix}</span>${paragraph.innerHTML}`;
    }
  } else {
    console.warn(`Element with ID ${elementId} not found.`);
  }
}

function parseAndPopulateRequirementsComponent() {
  const soMinWindowsDiv = document.getElementById('so-min-win'),
    soRecWindowsDiv = document.getElementById('so-rec-win'),
    armRecWindowsDiv = document.getElementById('arm-rec-win'),
    armMinWindowsDiv = document.getElementById('arm-min-win'),
    memMinWindowsDiv = document.getElementById('mem-min-win'),
    memRecWindowsDiv = document.getElementById('mem-rec-win'),
    plaRecWindowsDiv = document.getElementById('pla-rec-win'),
    plaMinWindowsDiv = document.getElementById('pla-min-win'),
    soMinMacDiv = document.getElementById('so-min-mac'),
    soRecMacDiv = document.getElementById('so-rec-mac'),
    armRecMacDiv = document.getElementById('arm-rec-mac'),
    armMinMacDiv = document.getElementById('arm-min-mac'),
    memMinMacDiv = document.getElementById('mem-min-mac'),
    memRecMacDiv = document.getElementById('mem-rec-mac'),
    plaRecMacDiv = document.getElementById('pla-rec-mac'),
    plaMinMacDiv = document.getElementById('pla-min-mac'),
    soMinLinuxDiv = document.getElementById('so-min-lin'),
    soRecLinuxDiv = document.getElementById('so-rec-lin'),
    armRecLinuxDiv = document.getElementById('arm-rec-lin'),
    armMinLinuxDiv = document.getElementById('arm-min-lin'),
    memMinLinuxDiv = document.getElementById('mem-min-lin'),
    memRecLinuxDiv = document.getElementById('mem-rec-lin'),
    plaRecLinuxDiv = document.getElementById('pla-rec-lin'),
    plaMinLinuxDiv = document.getElementById('pla-min-lin');

  const windowsTextRec = soRecWindowsDiv.textContent.split(';'),
    windowsTextMin = soMinWindowsDiv.textContent.split(';'),
    macTextRec = soRecMacDiv.textContent.split(';'),
    macTextMin = soMinMacDiv.textContent.split(';'),
    linuxTextRec = soRecLinuxDiv.textContent.split(';'),
    linuxTextMin = soMinLinuxDiv.textContent.split(';');

  soMinWindowsDiv.textContent = windowsTextMin[0];
  soRecWindowsDiv.textContent = windowsTextRec[0];
  armRecWindowsDiv.textContent = windowsTextRec[1];
  armMinWindowsDiv.textContent = windowsTextMin[1];
  memMinWindowsDiv.textContent = windowsTextMin[2];
  memRecWindowsDiv.textContent = windowsTextRec[2];
  plaRecWindowsDiv.textContent = windowsTextRec[3];
  plaMinWindowsDiv.textContent = windowsTextMin[3];
  soMinMacDiv.textContent = macTextMin[0];
  soRecMacDiv.textContent = macTextRec[0];
  armRecMacDiv.textContent = macTextRec[1];
  armMinMacDiv.textContent = macTextMin[1];
  memMinMacDiv.textContent = macTextMin[2];
  memRecMacDiv.textContent = macTextRec[2];
  plaRecMacDiv.textContent = macTextRec[3];
  plaMinMacDiv.textContent = macTextMin[3];
  soMinLinuxDiv.textContent = linuxTextMin[0];
  soRecLinuxDiv.textContent = linuxTextRec[0];
  armRecLinuxDiv.textContent = linuxTextRec[1];
  armMinLinuxDiv.textContent = linuxTextMin[1];
  memMinLinuxDiv.textContent = linuxTextMin[2];
  memRecLinuxDiv.textContent = linuxTextRec[2];
  plaRecLinuxDiv.textContent = linuxTextRec[3];
  plaMinLinuxDiv.textContent = linuxTextMin[3];
}

function toggleTables() {
  const windowsSelector = document.getElementById('windows-selector'),
    macSelector = document.getElementById('mac-selector'),
    linuxSelector = document.getElementById('linux-selector'),
    tableWindows = document.getElementById('table-windows'),
    tableMac = document.getElementById('table-mac'),
    tableLinux = document.getElementById('table-linux');

  windowsSelector.addEventListener('click', function () {
    macSelector.style.backgroundColor = '#0B0B0B';
    macSelector.style.border = '1px solid #D9174680';
    linuxSelector.style.backgroundColor = '#0B0B0B';
    linuxSelector.style.border = '1px solid #D9174680';
    windowsSelector.style.backgroundColor = '#565656';
    windowsSelector.style.border = '0px none';
    tableWindows.style.display = 'block';
    tableMac.style.display = 'none';
    tableLinux.style.display = 'none';
  });

  macSelector.addEventListener('click', function () {
    windowsSelector.style.backgroundColor = '#0B0B0B';
    windowsSelector.style.border = '1px solid #D9174680';
    linuxSelector.style.backgroundColor = '#0B0B0B';
    linuxSelector.style.border = '1px solid #D9174680';
    macSelector.style.backgroundColor = '#565656';
    macSelector.style.border = '0px none';
    tableWindows.style.display = 'none';
    tableMac.style.display = 'block';
    tableLinux.style.display = 'none';
  });

  linuxSelector.addEventListener('click', function () {
    windowsSelector.style.backgroundColor = '#0B0B0B';
    windowsSelector.style.border = '1px solid #D9174680';
    linuxSelector.style.backgroundColor = '#565656';
    linuxSelector.style.border = '0px none';
    macSelector.style.backgroundColor = '#0B0B0B';
    macSelector.style.border = '1px solid #D9174680';
    tableWindows.style.display = 'none';
    tableMac.style.display = 'none';
    tableLinux.style.display = 'block';
  });
}

function setDefaultDisplay() {
  const tableWindows = document.getElementById('table-windows'),
    tableMac = document.getElementById('table-mac'),
    tableLinux = document.getElementById('table-linux'),
    windowsSelector = document.getElementById('windows-selector');

  windowsSelector.style.backgroundColor = '#565656';
  windowsSelector.style.border = '0px none';
  tableWindows.style.display = 'block';
  tableMac.style.display = 'none';
  tableLinux.style.display = 'none';
}

function checkRecentsBreadcrumbVisibility() {
  const url = document.referrer;
  const recentsBreadcrumbs = [
    {
      class: '.artigos_recentes_link',
      url: 'artigos',
    },
    {
      class: '.guias_recentes_link',
      url: 'guias',
    },
    {
      class: '.criticas_recentes_link',
      url: 'criticas',
    },
    {
      class: '.indies_recentes_link',
      url: 'indies',
    },
  ];

  if (url.includes('recentes')) {
    recentsBreadcrumbs.forEach((breadcrumb) => {
      if (url.includes(breadcrumb.url)) {
        const arrow = document.querySelector('.arrow_recentes_link');
        arrow.style.display = 'block';
        const link = document.querySelector(breadcrumb.class);
        link.style.display = 'block';
      }
    });
  }
}

function moveContentAfterGallery() {
  const sourceDiv = document.getElementById('rich-text-field');
  const targetDiv = document.getElementById('empty-rich-text');
  const content = sourceDiv.innerHTML;
  const galleryIndex = content.indexOf('[[galeria]]');

  if (galleryIndex !== -1) {
    const galleryContent = content.substring(galleryIndex + '[[galeria]]'.length);
    targetDiv.innerHTML = galleryContent;
    sourceDiv.innerHTML = content.substring(0, galleryIndex);
  }
}
function setBuyButtonScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Initial setting for the Buy Button
  gsap.set('.buy_button_contain', { bottom: '-40px' });
  gsap.set('.buy_expand_wrap', { display: 'none' });

  // Review container animation
  const criticasDiv = document.getElementById('criticas');

  if (criticasDiv && criticasDiv.textContent === 'Críticas') {
    // Buy Button animation
    gsap.to('.buy_button_contain', {
      scrollTrigger: {
        trigger: '.u-rich-text',
        start: 'top 0px',
        onEnter: () =>
          gsap.to('.buy_button_contain', { duration: 0.5, bottom: '40px', ease: 'power2.out' }),
        //onLeaveBack: () => gsap.to(".buy_button_contain", { duration: 0.4, bottom: "-40px", ease: "power2.out" }),
        //markers: true // Optional: Add markers for debugging
      },
    });

    // Review container animation
    const reviewAnimation = gsap.to('.buy_expand_wrap', {
      display: 'flex',
      scrollTrigger: {
        trigger: '.review_contain',
        start: 'top 50%',
        onEnter: () => {
          gsap.set('.buy_expand_wrap', { display: 'flex' }),
            gsap.to('.buy_button_contain', { backgroundColor: 'var(--swatch--grey-secondary)' });
        },
        //markers: true // Optional: Add markers for debugging
      },
    });

    // Add event listener to the close button
    const closeBtn = document.querySelector('.close_btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        reviewAnimation.scrollTrigger.kill();
        gsap.set('.buy_expand_wrap', { display: 'none' });
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);
  checkRecentsBreadcrumbVisibility();
  processRichText('rich-text-field', 'anchor-list-div');
  addPrefixToRichText('rich-text-pros', '+', '#38BA2D');
  addPrefixToRichText('rich-text-cons', '-', '#C40808');
  parseAndPopulateRequirementsComponent();
  toggleTables();
  setDefaultDisplay();
  moveContentAfterGallery();
  makeImagesClickable(document.getElementById('rich-text-field'));
  makeImagesClickable(document.getElementById('empty-rich-text'));
  setBuyButtonScroll();
});

$(document).ready(function () {
  setTimeout(function () {
    $('.img-gallery-subs-slide').each(function () {
      const thumbNo = $(this).index();
      $(this).on('click', function () {
        $('.img-gallery-main')
          .find('.w-slider-dot')
          .eq(thumbNo - 1)
          .click();
      });
    });
  }, 250); // 250 milliseconds delay
});
