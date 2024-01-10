//* card prop aldığı için onun test'i birazcık farklı
//* prop'un örneğini oluşturup gönderiyoruz ama prop fonk, ise mocklama dediğimiz işlem yapılır
import { render, screen } from '@testing-library/react';
import Card from '.';
import userEvent from '@testing-library/user-event';

const item = {
    name: 'Salted caramel',
    imagePath: '/images/salted-caramel.png',
};

const basket = [
    {
        name: 'Salted caramel',
        imagePath: '/images/salted-caramel.png',
    },
    {
        name: 'Salted caramel',
        imagePath: '/images/salted-caramel.png',
    },
    {
        name: 'Chocolate',
        imagePath: '/images/chocolate.png',
    },
];

// prop alan bileşenleri test ediyorsak 
// aldıkları propların benzerini göndeririz.
test('', async () => {

    // prop olarak gönderdiğimiz, orijinal fonk. yerine geçecek
    // ve bize test imkanları sağlayacak mock fonk. oluşturma
    const mock = jest.fn();

    render(<Card item={item} basket={basket} setBasket={mock} />)

    // item'ın name değeri için ekrana bir span basılır
    screen.getByText(item.name)

    // resmin src kısmında item'ın imagePath değerine uygun olması lazım
    const img = screen.getByAltText("çeşit-resim")// get kullandık çünkü verileri yukarda kendimiz tanımladık
    expect(img).toHaveAttribute("src", item.imagePath)

    // Toplam ürün bilgisi kısmında sepette iki eleman olduğunda iki yazmalı  
    const amount = screen.getByTestId("amount");
    expect(amount).toHaveTextContent(2);

    // ekle ve sıfırla butonlarına tıklanınca setBasket tetiklenir
    const user = userEvent.setup();
    const addBtn = screen.getByRole("button", { name: "Add" })
    const delBtn = screen.getByRole("button", { name: "Reset" })

    // ekle butonuna tıkla
    await user.click(addBtn);

    // setBasket fonksiyonu doğru paramtreyle çalıştı mı?
    expect(mock).toHaveBeenCalledWith([...basket, item]);

    // sıfırla butonuna tıkla
    await user.click(delBtn);

    // set basket doğru parametreyle çalıştı mı?
    expect(mock).toHaveBeenCalledWith([
        {
            name: 'Chocolate',
            imagePath: '/images/chocolate.png',
        },
    ]);//filter ile de yapabiliriz bunu ama göstermek için mantığı doğrudan böyle yaptık

})