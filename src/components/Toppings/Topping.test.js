import { render, screen } from '@testing-library/react';
import Toppings from '.';
import userEvent from '@testing-library/user-event';

test("api'dan gelen soslar için ekrana kartlar basılıyor mu?", async () => {
    render(<Toppings />);

    const images = await screen.findAllByAltText('sos-resim');

    expect(images.length).toBeGreaterThanOrEqual(1);
});

test('sosları ekleme çıkarma işlemi topam fiyatı etkiler', async () => {
    render(<Toppings />);
    const user = userEvent.setup();

    // toplam ücret başlığı sıfır mı?
    const total = screen.getByRole('heading', {
        name: /soslar ücreti/i,
    });

    expect(total).toHaveTextContent(0);

    // bütün sosların checkbox'larını çağır
    const toppings = await screen.findAllByRole('checkbox');

    // soslardan 1.sini sepete ekle
    await user.click(toppings[0])

    // total 3 oldu mu
    expect(total).toHaveTextContent("3") // string 3 de number 3de hata vermedi

    // soslardan 2.sünü sepete ekle
    await user.click(toppings[2])

    // total 6ya eşit mi
    expect(total).toHaveTextContent(6)

    // 1. sosu kaldır
    await user.click(toppings[0])

    // total 3'e eşit mi
    expect(total).toHaveTextContent(3)

    // 3. sosu kaldır 
    await user.click(toppings[2])

    // total 0'a eşit mi
    expect(total).toHaveTextContent(0)


});