const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'ally0.ploudos.me',
  username: 'AllyServer',
})

// Configurações do bot
let isAfk = true
let currentYaw = 0

// Função para mover o bot
function moveBot() {
  if (!isAfk) return
  // Move o bot aleatoriamente
  const direction = Math.floor(Math.random() * 4)
  switch (direction) {
    case 0:
      bot.setControlState('forward', true)
      break
    case 1:
      bot.setControlState('back', true)
      break
    case 2:
      currentYaw += 90
      bot.look(currentYaw, 0)
      break
    case 3:
      currentYaw -= 90
      bot.look(currentYaw, 0)
      break
  }
  // Desativa os controles após um tempo
  setTimeout(() => {
    bot.clearControlStates()
    setTimeout(moveBot, 2000)
  }, 1000)
}

// Evento de chat
bot.on('chat', (username, message) => {
  if (username === bot.username) return
  // Responde ao chat
  bot.chat(message)
  // Ativa/desativa o modo afk
  if (message === 'afk') {
    isAfk = !isAfk
    if (isAfk) {
      moveBot()
    } else {
      bot.clearControlStates()
    }
  }
})

// Evento de detecção de entidades
bot.on('entitySpawn', entity => {
  // Verifica se é um mob hostil
  if (entity.type === 'mob' && entity.kind === 'Hostile') {
    // Ataca o mob
    bot.attack(entity)
    // Faz o bot olhar na direção do mob
    setTimeout(bot.lookAt(entity.position.offset(0, entity.height, 0)), 500)
  }
})

// Log de erros e kick
bot.on('kicked', console.log)
bot.on('error', console.log)
