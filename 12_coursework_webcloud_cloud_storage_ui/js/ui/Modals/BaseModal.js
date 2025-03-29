/**
 * Класс BaseModal
 * Используется как базовый класс всплывающего окна
 */
class BaseModal {
  constructor( element ) {
    this.element = element; // jQuery-элемент (semantic ui modal)
    this.domElement = element[0]; // Нативный DOM-элемент (на 0-й позиции)
  }

  /**
   * Открывает всплывающее окно
   */
  open() {
    this.element.modal('show');
  }

  /**
   * Закрывает всплывающее окно
   */
  close() {
    this.element.modal('hide');
  }
}