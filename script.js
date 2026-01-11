// script.js

async function shortsVerisiGonder() {
    const videoInput = document.getElementById('videoSecici');
    const isimInput = document.getElementById('videoIsmi');

    // 1. Dosya seçilmiş mi kontrol et
    if (videoInput.files.length === 0) {
        alert("Lütfen bir video dosyası seçin!");
        return;
    }

    const dosya = videoInput.files[0];
    const videoIsmi = isimInput.value || "isimsiz_video";

    // 2. shorts.json için veri objesini hazırla
    const gonderiVerisi = {
        video_ismi: videoIsmi,
        nbt_kodu: `nbt_${Date.now()}_video`, // Otomatik nbt kimliği
        dosya_tipi: dosya.type,
        boyut: (dosya.size / 1024 / 1024).toFixed(2) + " MB",
        tarih: new Date().toLocaleDateString()
    };

    console.log("Sunucuya haber salınıyor... Veri:", gonderiVerisi);

    // 3. Dosyayı ve JSON verisini backend'e gönder (Haber Salma)
    const formData = new FormData();
    formData.append("video_dosyasi", dosya);
    formData.append("json_verisi", JSON.stringify(gonderiVerisi));

    try {
        const response = await fetch('http://localhost:3000/shorts-kaydet', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("Haber salındı! shorts.json güncellendi ve video kaydedildi.");
        } else {
            alert("Sunucuya ulaşılamadı. (Node.js server çalışıyor mu?)");
        }
    } catch (hata) {
        console.error("Hata oluştu:", hata);
        alert("Bağlantı hatası! Lütfen backend sunucunuzun açık olduğundan emin olun.");
    }
}