const selectors = {
  header: '.siteHeader',
  headerMenuToggler: '[data-header-menu-toggler]',
  togglerIconInactive: '[data-toggler-icon-inactive]',
  togglerIconActive: '[data-toggler-icon-active]',
  headerMenu: '[data-header-menu]',
  dropdownMenuParent: '[data-dropdown-menu-parent]',
  dropdownMenu: '[data-dropdown-menu]',
  dropdownMenuOpen: '[data-dropdown-menu-open]',
  dropdownMenuClose: '[data-dropdown-menu-close]',
  subDropdownMenu: '[data-sub-dropdown-menu]',
  subDropdownMenuToggler: '[data-sub-dropdown-menu-toggler]',
  subDropdownMenuBody: '[data-sub-dropdown-menu-body]',
}

const dom = {}

const cacheDom = () => {
  dom.header = document.querySelector(selectors.header);
  dom.headerMenuToggler = document.querySelector(selectors.headerMenuToggler);
  dom.headerMenu = document.querySelector(selectors.headerMenu);
  dom.dropdownMenuParents = document.querySelectorAll(selectors.dropdownMenuParent);
  dom.dropdownMenuOpens = document.querySelectorAll(selectors.dropdownMenuOpen);
  dom.dropdownMenuCloses = document.querySelectorAll(selectors.dropdownMenuClose);
  dom.subDropdownMenuTogglers = document.querySelectorAll(selectors.subDropdownMenuToggler);
}

const scrollBehavior = () => {
  if (dom.header) {
    let lastScrollTop = 0;
    window.addEventListener("scroll", (evt) => {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (scrollTop > lastScrollTop){
        dom.header.classList.add('inactive');
      } else {
        dom.header.classList.remove('inactive');
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }
}

const navActions = () => {
  dom.dropdownMenuParents.forEach((parent) => {
    parent.addEventListener('mouseenter', (evt) => {
      document.body.classList.add('header-menu-opened');
    });

    parent.addEventListener('mouseleave', (evt) => {
      document.body.classList.remove('header-menu-opened');
    });
  });

  if (dom.headerMenuToggler) {
    dom.headerMenuToggler.addEventListener('click', (evt) => {
      let offset = dom.header.offsetHeight;
      offset += dom.header.getBoundingClientRect().top;
      let height = window.innerHeight - offset;
      dom.headerMenu.style.height = height + 'px';
      dom.headerMenu.style.top = (offset - 1) + 'px';
      dom.headerMenu.classList.toggle('active');
      if (dom.headerMenu.classList.contains('active')) {
        dom.headerMenuToggler.classList.add('active');
        document.body.classList.add('header-menu-opened');
      } else {
        dom.headerMenuToggler.classList.remove('active');
        document.body.classList.remove('header-menu-opened');
      }
    })
  }

  dom.dropdownMenuOpens.forEach((ele) => {
    ele.addEventListener('click', (evt) => {
      evt.preventDefault();

      const dropdownMenu = ele.parentElement.querySelector(selectors.dropdownMenu);
      dropdownMenu.classList.add('active');
    })
  });

  dom.dropdownMenuCloses.forEach((ele) => {
    ele.addEventListener('click', (evt) => {
      evt.preventDefault();

      const dropdownMenu = ele.closest(selectors.dropdownMenu);
      dropdownMenu.classList.remove('active');
    })
  })

  dom.subDropdownMenuTogglers.forEach((ele) => {
    ele.addEventListener('click', (evt) => {
      evt.preventDefault();

      const subDropdownMenu = ele.closest(selectors.subDropdownMenu);
      subDropdownMenu.classList.toggle('active');
    })
  })
}

const siteHeader = {
  init() {
    cacheDom()
    scrollBehavior()
    navActions()
  }
}

export default siteHeader
