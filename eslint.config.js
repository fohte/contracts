import { config } from '@fohte/eslint-config'

export default config(
<<<<<<< before updating
  { typescript: { typeChecked: true } },
  { ignores: ['**/dist/'] },
||||||| last update
  { typescript: { typeChecked: true } },
=======
>>>>>>> after updating
  {
    typescript: { typeChecked: true },
    errorHandling: {},
  },
)
