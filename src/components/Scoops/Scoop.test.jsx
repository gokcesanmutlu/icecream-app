import { render, screen } from "@testing-library/react"
import Scoops from "."
import userEvent from '@testing-library/user-event';

/*
 ! Seçiciler
 ? Method [All] BySeçici
 * Method > get | find | query
 * get > element başlangıçta DOM'da var ise kulllanılır
 * query > get ile benzer şekilde çalışır eleman bulamazsa null döndürür 
 * find > elementin ne zaman ekran basılacağı belli değilse (async)
  
 * not: find methodu promise döndürür
 * - bu yüzden async await kullanılmalı
 
 * eğer All kullanırsak gelene cevap her zaman dizi şeklindedir
*/

test("API'dan gelen veriler için ekrana kartlar basılır", async () => {
    render(<Scoops />);

    // ekrana basılan kartları al
    // kartı seçmek için içindeki img'yi alman yeterli dedi nasıl yeterli oluyo ? içindekilerden biri apiden geldiyse diğerleri de gelmiştir. 
    // getByAltText kullanmadık çünkü carddaki alt=çeşit-resim olan image, apiden geliyor
    // Apiden gelen veri için test hemen çalışınca sıkıntı oluyo bu  noktada getbyalttext sıkıntı oluyo
    // bunda await de kullanamıyoruz.getbyalttext direkt ekrana basılmış elemanı çağırmaya yarar
    // Daha sonra ekrana basılan apiden gelen elemanları alma gibi bir meziyeti yok
    const images = await screen.findAllByAltText("çeşit-resim");
    // console.log(images) // bu images, console'da dizi olacaktır, zira birden fazla eleman çağırdık

    // gelen resimlerin sayısı birden büyük mü?
    expect(images.length).toBeGreaterThanOrEqual(1);
});

// add ve reset butonlarının işlevselliği
test('Çeşit ekleme ve sıfırlamanın toplama etkisi', async () => {

    render(<Scoops />)
    const user = userEvent.setup();

    //1) ekleme ve sıfırlama elemanlarını çağırma // find kullandık çünkü buttonlar bir api isteğinden sonra ekrana basılıyo
    const addButtons = await screen.findAllByRole("button", { name: "Add" })
    const delButtons = await screen.findAllByRole("button", { name: "Reset" })

    //2) toplam spanı çağır
    const total = screen.getByRole('heading', { name: /total/i });

    //3) Topla Fiyatı 0'dır
    expect(total).toHaveTextContent(0) // number 0 da hata vermiyo

    //4) ekle butonlarından birine tıklanır
    await user.click(addButtons[0])

    //5) toplam fiyatı 20 olur
    expect(total).toHaveTextContent(20)

    //6) farklı bir çeşitten iki tane daha eklenir
    await user.dblClick(addButtons[2])

    //7) toplam fiyat 60 olur
    expect(total).toHaveTextContent(60)

    //8) 1 tane eklenenin sıfırla butonuna tıklanır
    await user.click(delButtons[0])

    //9) toplam fiyat 40 olur
    expect(total).toHaveTextContent(40)

    //10) 2 tane eklenenin sıfırla butonuna tıklanır
    await user.click(addButtons[2])

    //11) toplam fiyat 0 olur
    expect(total).toHaveTextContent(0)

})