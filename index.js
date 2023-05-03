const mineflayer = require('mineflayer')
const bot = mineflayer.createBot({
  host: 'ally0.ploudos.me',
  username: 'AllyServer',
})

// Função para definir aleatoriamente as teclas de controle
function randomMovement() {
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  bot.setControlState('forward', randInt(0, 1))
  bot.setControlState('back', randInt(0, 1))
  bot.setControlState('left', randInt(0, 1))
  bot.setControlState('right', randInt(0, 1))
  bot.setControlState('jump', randInt(0, 1))
}

// Configuração do servidor web
const express = require('express')
const app = express()
const port = 3000

// Endpoint para verificar o status do bot
app.get('/ping', (req, res) => {
  if (bot && bot.entity) {
    res.send(`Bot está online. Jogador: ${bot.entity.username}`)
  } else {
    res.send('Bot está offline.')
  }
})

// Iniciar o servidor web
app.listen(port, () => {
  console.log(`Servidor web iniciado na porta ${port}`)
})

// Andar aleatoriamente quando o bot estiver conectado
bot.on('spawn', () => {
  setInterval(randomMovement, 500) // Andar aleatoriamente a cada 500ms
})

// Log de erros e kick
bot.on('kicked', console.log)
bot.on('error', console.log)
