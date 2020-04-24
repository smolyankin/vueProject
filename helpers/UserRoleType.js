const Types = [
  {
    name: 'Add',
    id: 0,
    title: 'Создание'
  },
  {
    name: 'Edit',
    id: 1,
    title: 'Изменение'
  },
  {
    name: 'Delete',
    id: 2,
    title: 'Удаление'
  },
  {
    name: 'Read',
    id: 3,
    title: 'Чтение'
  },
  {
    name: 'Print',
    id: 4,
    title: 'Печать'
  }
]

export default class UserRoleType {
  /**
   * user role types
   */
  static getAll = () => Types

  /**
   * user role type by id
   * @param {int} id
   */
  static getById(id) {
    const result = Types.find((item) => item.id === id)
    return Object.freeze(result)
  }

  /**
   * user role type by name
   * @param name
   * @returns {*}
   */
  static getByName(name) {
    const result = Types.find((item) => item.name === name)
    return Object.freeze(result)
  }
}
