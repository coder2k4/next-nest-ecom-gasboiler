import Document from 'next/document'
import {withFork} from "effector-next";


const enhance = withFork({ debug: false})


// function Document() {
//   return (
//     <Html lang="en">
//       <Head />
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   )
// }

export default enhance(Document)
