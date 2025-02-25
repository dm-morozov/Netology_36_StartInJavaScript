document.querySelectorAll('.dropdown').forEach(dropdown => {
   
    const dropdownValue = dropdown.querySelector('.dropdown__value'),
        dropdownList = dropdown.querySelector('.dropdown__list'),
        dropdownItems = dropdown.querySelectorAll('.dropdown__link');

    console.log(dropdownValue)
    console.log(dropdownList)
    console.log(dropdownItems)

    dropdownValue.addEventListener('click', () => {

        // if (dropdownList.classList.contains('dropdown__list_active')) {
        //     dropdownList.classList.remove('dropdown__list_active')
        // } else {
        //     dropdownList.classList.add('dropdown__list_active')
        // }

        dropdownList.classList.toggle('dropdown__list_active')

    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault() // Чтобы ссылки не перезагружали страницу
            dropdownValue.textContent = item.textContent.trim()
            console.log(dropdownValue.textContent)
            dropdownList.classList.remove('dropdown__list_active')
        })
    })

});
