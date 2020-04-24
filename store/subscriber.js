export const state = () => ({
  subscribers: [],
  total: null,
  subscriber: {},
  subscribersToPrint: []
})

export const getters = {
  /**
   * subscribers
   *
   * @param state
   * @returns {getters.subscribers|(function(*))|*|null}
   */
  subscribers: (state) => {
    return state.subscribers
  },
  /**
   * subscribers count
   * @param state
   * @returns {getters.subscribersTotal|null|number}
   */
  subscribersTotal: (state) => state.total,
  /**
   * subscriber
   *
   * @param state
   * @returns {getters.subscriber|(function(*))|*|null}
   */
  subscriber: (state) => {
    return state.subscriber
  },
  /**
   * subscribers
   *
   * @param state
   * @returns {getters.subscribersToPrint|(function(*))|*|null}
   */
  subscribersToPrint: (state) => {
    return state.subscribersToPrint
  }
}

export const mutations = {
  setSubscribers(state, { items, count }) {
    state.subscribers = items
    state.total = count
  },
  setSubscriber(state, data) {
    state.subscriber = data
  },
  setSubscribersToPrint(state, items) {
    state.subscribersToPrint = items
  },
  removeSubscriber(state, id) {
    state.subscribers = state.subscribers.filter((item) => {
      return item.id !== id
    })
  }
}

export const actions = {
  /**
   * get subscribers
   *
   * @param state
   * @param commit
   * @param skip
   * @returns {Promise<any>}
   */
  async fetchSubscribers({ state, commit }, skip = 0) {
    try {
      const response = await this.$axios.$get('/subscriber', {
        params: {
          skip: skip || 0
        }
      })
      commit('setSubscribers', response)
      return response
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      throw e
    }
  },

  /**
   * create new subscriber
   *
   * @param commit
   * @param data
   */
  async addSubscriber({ commit }, data) {
    try {
      await this.$axios.$post(`/subscriber`, data)
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
    }
  },

  /**
   * get subscriber details by id
   * @param commit
   * @param {int} id
   * @returns {Promise<any>}
   */
  async fetchSubscriber({ commit }, id) {
    try {
      const subscriber = await this.$axios.$get(`/subscriber/${id}`)
      commit('setSubscriber', subscriber)
      return subscriber
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      throw e
    }
  },

  /**
   * update subscriber
   *
   * @param commit
   * @param data
   */
  async updateSubscriber({ commit }, data) {
    try {
      await this.$axios.$put(`/subscriber/${data.id}`, data)
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
    }
  },

  /**
   * get subscribers to print
   *
   * @param state
   * @param commit
   * @returns {Promise<any>}
   */
  async fetchSubscribersToPrint({ state, commit }) {
    try {
      const response = await this.$axios.$get('/subscriber/print')
      commit('setSubscribersToPrint', response)
      return response
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      throw e
    }
  },

  /**
   * delete subscriber by id
   *
   * @param commit
   * @param id
   */
  async deleteSubscriber({ commit }, id) {
    try {
      await this.$axios.$delete(`/subscriber/${id}`)
      commit('removeSubscriber', id)
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
    }
  }
}
