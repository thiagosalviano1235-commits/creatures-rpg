# Terra de Aster

Projeto inicial de um RPG 2D em HTML5, CSS3 e JavaScript para navegador.

## Estrutura de arquivos

- `index.html` — shell principal da interface e menu inicial.
- `styles/main.css` — estilos do projeto e menu.
- `src/config.js` — constantes globais do mundo, câmera e tiles.
- `src/utils/storage.js` — persistência com localStorage.
- `src/game/World.js` — mapa inicial, colisões e renderização do mundo.
- `src/game/Player.js` — lógica do personagem, movimento e desenho.
- `src/game/Camera.js` — seguimento suave da câmera.
- `src/game/Game.js` — ciclo principal do jogo, inputs e salvamento automático.
- `src/main.js` — ponto de entrada.

## Como executar

Abra o arquivo `index.html` diretamente no navegador, ou sirva a pasta com um servidor estático simples.

Exemplo:

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000`.

## Fase atual

Esta primeira entrega implementa a arquitetura base do projeto, o mapa inicial de cidade/rota, o jogador, o movimento em 4 direções e as colisões com obstáculos, além da câmera seguindo o personagem.
