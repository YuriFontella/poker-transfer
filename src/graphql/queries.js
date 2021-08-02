export const LOGIN = `
  mutation ($email: String!, $password: String!) {
    auth: login(email: $email, password: $password) {
      token
      user {
        name
        role
        image
        email
      }
    }
  }
`
export const NOTIFICATION = `
  subscription {
    notification
  }
`
export const NEW_PLAYER = `
  mutation ($player: InputPlayer) {
    player: new_player(player: $player)
  }
`
export const PLAYERS = `
  query ($limit: Int, $offset: Int, $name: String) {
    players (limit: $limit, offset: $offset, name: $name) {
      id
      credits
      debts
      name
      email
      image
    }
  }
`
export const TRANSFERS = `
  query {
    transfers {
      id
      value
      to {
        name
      }
      from {
        name
      }
      performed {
        name
      }
    }
  }
`
export const PLAYER = `
  query ($id: ID) {
    player (id: $id) {
      id
      name
      email
      image
      credits
      debts
      coins {
        id
        balance
        type
        created_at
        extract {
          id
          description
          user {
            name
            email
          }
        }
      }
    }
  }
`
export const NEW_COIN = `
  mutation ($coin: InputCoin) {
    coin: new_coin(coin: $coin)
  }
`
export const NEW_TRANSFER = `
  mutation ($transfer: InputTransfer) {
    transfer: new_transfer(transfer: $transfer)
  }
`
export const REMOVE_TRANSFER = `
  mutation ($id: ID) {
    transfer: remove_transfer(id: $id)
  }
`