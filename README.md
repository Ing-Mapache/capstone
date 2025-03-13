# Pruebas End-to-End para el Juego de UNO

## Casos de Uso Probados

1. **Registro de un nuevo jugador**:
   - Endpoint: `POST /api/players/register`
   - Descripción: Verifica que un nuevo jugador pueda registrarse correctamente.
   - Resultado esperado: Código de estado 201 y un ID de jugador en la respuesta.

2. **Inicio de sesión de un jugador**:
   - Endpoint: `POST /api/auth/login`
   - Descripción: Verifica que un jugador pueda iniciar sesión y recibir un token de autenticación.
   - Resultado esperado: Código de estado 200 y un token en la respuesta.

3. **Creación de un nuevo juego**:
   - Endpoint: `POST /api/games`
   - Descripción: Verifica que un jugador pueda crear una nueva partida de UNO.
   - Resultado esperado: Código de estado 201 y un ID de juego en la respuesta.

4. **Unirse a un juego existente**:
   - Endpoint: `POST /api/games/join`
   - Descripción: Verifica que un jugador pueda unirse a una partida existente.
   - Resultado esperado: Código de estado 200 y un mensaje de éxito.

5. **Jugar una carta**:
   - Endpoint: `PUT /api/cards/play`
   - Descripción: Verifica que un jugador pueda jugar una carta durante su turno.
   - Resultado esperado: Código de estado 200 y un mensaje de éxito.

6. **Finalizar un juego**:
   - Endpoint: `POST /api/games/end`
   - Descripción: Verifica que el creador del juego pueda finalizar la partida.
   - Resultado esperado: Código de estado 200 y un mensaje de éxito.
