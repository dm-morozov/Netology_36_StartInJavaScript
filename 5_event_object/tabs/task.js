document.querySelectorAll('.tabs').forEach(tabsMain => {
    const tabNavigation = tabsMain.querySelectorAll('.tab'),
    tabContents = tabsMain.querySelectorAll('.tab__content');

    tabNavigation.forEach((item, index) => {

        item.addEventListener('click', (event) => {
            event.preventDefault();


            tabContents.forEach(content => content.classList.remove('tab__content_active'));
            tabNavigation.forEach(tab => tab.classList.remove('tab_active'));

            tabContents[index].classList.add('tab__content_active');
            item.classList.add('tab_active');

            // console.log(item.classList.contains('tab_active'), index)
            // if (item.classList.contains('tab_active')) {
            //     console.log(tabContents[index])
            // }
        })
    })

    // console.log(tabNavigation)
    // console.log(tabContents)
})