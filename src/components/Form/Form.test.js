
import { fireEvent, render, screen } from '@testing-library/react';
import Form from './index';
import userEvent from '@testing-library/user-event';

test('Koşulların onaylanmasına göre buton aktifliği', async () => {
    //test bileşenlerini ekrana bas
    render(<Form />)

    //user'in kurulumunu yap
    const user = userEvent.setup();

    // gerekli elemanları al
    const orderBtn = screen.getByRole("button")
    const checkBox = screen.getByRole("checkbox")

    // 1) checkbox başlangıçta tiksizdir.
    expect(checkBox).not.toBeChecked();
    //checkboxtan tiksiz olmamasını bekliyorum
    // sorduğum soru: checkbox tikli değil mi

    // 2) button başlangıçta inaktiftir.
    expect(orderBtn).toBeDisabled

    // 3) checkbox tiklenir
    await user.click(checkBox)

    // 4) button aktif olur
    expect(orderBtn).not.toBeDisabled

    //inputtan tiki kaldırdığımız senaryoyu da test edelim
    fireEvent.click(checkBox)
    expect(orderBtn).toBeDisabled
})

test('onay butonu hover olunca bildirim ekrana gelir', async () => {
    render(<Form />)

    const user = userEvent.setup()

    const checkbox = screen.getByRole("checkbox")
    const button = screen.getByRole("button")
    const popup = screen.getByText("Size gerçekten", { exact: false })
    // içindeki yazının belli bir kısmına göre elemanı çağırmak istiyorsak 2 yöntem mevcuttur, biri exact:false
    // 2. yöntem Regex yöntemi: const popUp = screen.getByText(/size gerçekten/i)     
    // i=insensitive anlamına gelir hem büyük küçük harf duyarlılığını ortadan kaldırır hem de hepsini yazma zorunluluğunu ortadan kaldırır
    // iki yöntemden birini kullanmazsak cümlenin tamamını yazmalıyız

    // checkboxı tikle
    await user.click(checkbox);

    // mouse'ı buttonun üzerine getir
    // urada fireevent kullandık çünkü user'in ki daha kısıtlı seçenekler onda mouse ile hover yapma yok
    fireEvent.mouseEnter(button)

    //bildirim gözüküyor mu?
    //(toBeVisible : opacity>0 ; visible:visible; display!=none)
    expect(popup).toBeVisible();

    // mause'u butondan ayır
    fireEvent.mouseLeave(button)

    //popup gözükmez kontrolü yap
    expect(popup).not.toBeVisible()
})