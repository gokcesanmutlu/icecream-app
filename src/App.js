import Scoops from "./components/Scoops"
import Toppings from './components/Toppings';
import Form from './components/Form';
// bileşenlerin içinde index yaptık ki import ederken klasör adı yeterli olsun 
// ama index değil de scoops.jsx olsaydı o zaman klasörün içindeki scoops.jsx diye belirtmek gerekirdi bu da importu karıştırırdı
// özellikle bir klasörün içinde içinde birden fazla bileşen varsa bunu tercih ediyoruz
const App = () => {
  return (
    <div>
      <Scoops/>
      <Toppings/>
      <Form/>
    </div>
  )
}

export default App