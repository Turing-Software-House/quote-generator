import React, { useState, useRef } from 'react';

// --- Helper Ikonlar ---
const ArrowUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414l-3-3z" clipRule="evenodd" /></svg>;
const ArrowDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.707-5.707a1 1 0 001.414 1.414l3-3a1 1 0 00-1.414-1.414L11 10.586V7a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3z" clipRule="evenodd" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const PrintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" /></svg>;
const SaveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" /></svg>;
const LoadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>;


// --- Başlangıç Verileri ---
const initialData = {
    themeColor: '#6366F1', // indigo-500
    company: {
        name: 'Turing Software House',
        slogan: 'Yazılımda İnovatif Çözüm Ortağınız',
        email: 'info@turingsoftware.house',
        phone: '+90 555 123 45 67',
    },
    client: {
        name: 'Memento Yetkilisine',
        company: 'memento-qr.com',
    },
    proposal: {
        number: 'TSH-2025-08-04',
        date: '9 Ağustos 2025',
        validity: 30,
    },
    introductionText: 'Değerli {clientName} Ekibi,\n\n{clientCompany} web platformunuzun geliştirilmesi ve iyileştirilmesi projesi için tarafımıza ilettiğiniz teknik dökümanları detaylıca incelemiş bulunmaktayız. Platformunuzun misyonunu ve hedeflerini anlıyor, bu değerli projede sizlere çözüm ortağı olmaktan heyecan duyuyoruz. {companyName} olarak, projenizin gereksinimlerini karşılayacak teknik uzmanlığa ve deneyime sahip olduğumuzu belirterek hazırladığımız proje teklifini bilgilerinize sunarız.',
    pricing: {
        hourlyRate: 60,
        estimatedHours: 150,
        fixedPrice: 8500,
        vatRate: 20,
        showHourlyOption: true,
        showFixedOption: true,
        showThreePhaseOption: true,
    },
    sections: [
        { id: 'introduction', title: 'Giriş', component: 'Introduction', enabled: true },
        { id: 'scope', title: 'Projenin Kapsamı', component: 'Scope', enabled: true },
        { id: 'pricing', title: 'Fiyatlandırma ve Ödeme Seçenekleri', component: 'Pricing', enabled: true },
        { id: 'plan', title: 'Proje Planı ve Zaman Çizelgesi', component: 'Plan', enabled: true },
        { id: 'terms', title: 'Genel Şartlar ve Koşullar', component: 'Terms', enabled: true }
    ],
    scopeDetails: {
        duration: '8 hafta (4 Sprint)',
        items: [
            { id: 1, title: 'Arayüz ve Kullanıcı Deneyimi (UI/UX) Geliştirmeleri', tasks: ['Kullanıcı profillerinin Memento tarafından sağlanacak yeni tasarıma göre güncellenmesi.', 'Ödeme ve sepet ekranlarının tasarımsal olarak yenilenmesi.', '"Hatıra Profilim" ekranının yeni tasarıma göre güncellenmesi.', 'Ana sayfaya "Demo Profili" butonu ve "Kullanıcı Yorumları" bölümü eklenmesi.', 'Mevcut web sitesi görsellerinin Memento tarafından iletilecek yenileriyle güncellenmesi.'] },
            { id: 2, title: 'Teknik ve Fonksiyonel Geliştirmeler', tasks: ['Profil QR kod tasarımının (logo, çerçeve vb.) güncellenmesi.', 'QR kod çıktısının fiziksel üretime uygun olacak şekilde JPEG formatından vektörel (DXF/CDR) formata dönüştürülmesi.', 'Sipariş alındığında belirlenen e-posta adresine taslak mail gönderiminin sağlanması.', 'Footer (alt bilgi) bölümündeki sosyal medya bağlantılarının kontrol edilerek WhatsApp ve TikTok ikonlarının eklenmesi.', 'Paket açıklamalarına tahmini fotoğraf/video sayısı bilgilerinin eklenmesi.'] },
            { id: 3, title: 'Performans ve Optimizasyon', tasks: ['Web sitesinin genel performansının ve sayfa yüklenme hızlarının iyileştirilmesi.', 'Mobil cihaz uyumluluğunun gözden geçirilerek kullanıcı deneyiminin optimize edilmesi.'] }
        ]
    },
    planDetails: {
        sprints: [
            { id: 1, title: 'Sprint 1 (Hafta 1-2): Analiz, Kurulum ve Temel Arayüz', tasks: ['Mevcut kod yapısının ve altyapının detaylı analizi.', 'Geliştirme ortamlarının kurulması.', 'Yeni kullanıcı profili, ödeme ve sepet ekranlarının temel HTML/CSS yapılarının oluşturulması.', 'Ana sayfa güncellemelerinin (Demo butonu, Yorumlar) taslak olarak yerleştirilmesi.'] },
            { id: 2, title: 'Sprint 2 (Hafta 3-4): Fonksiyonel Geliştirmeler ve QR Kod', tasks: ['QR kod tasarımının güncellenmesi ve DXF/CDR formatında çıktı alınacak altyapının geliştirilmesi.', 'Sipariş sonrası e-posta gönderim fonksiyonunun entegrasyonu.', 'Footer (alt bilgi) bölümündeki linklerin ve ikonların güncellenmesi.'] },
            { id: 3, title: 'Sprint 3 (Hafta 5-6): Arayüz Entegrasyonu ve Optimizasyon', tasks: ['Tasarımı tamamlanan arayüzlerin (profil, ödeme vb.) backend fonksiyonları ile entegrasyonu.', 'Web sitesi genel performans iyileştirmelerinin yapılması (resim optimizasyonu, kod temizliği).', 'Mobil uyumluluk testleri ve iyileştirmeleri.'] },
            { id: 4, title: 'Sprint 4 (Hafta 7-8): Test, Geri Bildirim ve Teslimat', tasks: ['Tüm fonksiyonların ve arayüzlerin kapsamlı testi.', 'Memento ekibinden gelen geri bildirimlerin uygulanması.', 'Son kontroller, hata düzeltmeleri ve projenin canlı ortama dağıtıma hazır hale getirilmesi.', 'Proje dokümantasyonunun tamamlanması ve teslimi.'] }
        ]
    },
    termsDetails: {
        items: [
            { id: 1, text: 'Bu teklif, tebliğ tarihinden itibaren 30 gün süreyle geçerlidir.'},
            { id: 2, text: 'Sabit fiyatlı tekliflerde belirtilen fiyatlara %20 KDV dahildir. Saatlik ücretlendirmede KDV ayrıca eklenecektir.'},
            { id: 3, text: 'Proje kapsamı dışındaki ek talepler ayrıca analiz edilerek fiyatlandırılacaktır.'},
            { id: 4, text: 'Projenin sağlıklı ilerlemesi için gerekli tasarım dosyaları, içerikler ve mevcut sisteme erişim bilgilerinin Memento tarafından zamanında sağlanması beklenmektedir.'},
            { id: 5, text: 'Teknik İnceleme ve Teklif Revizyonu: Bu teklif, sağlanan dökümanlara dayanmaktadır. Sözleşme sonrası mevcut kod tabanı, veritabanı yapısı ve API\'ların detaylı incelenmesinin ardından, öngörülemeyen teknik zorlukların tespiti halinde teklif revize edilebilir. Olası bir revizyon, karşılıklı mutabakat ile yapılacaktır.'},
            { id: 6, text: 'Ücretsiz Fesih Hakkı: Sözleşmenin imzalanmasını takiben 3 (üç) iş günü içerisinde herhangi bir gerekçe göstermeksizin ve cezai şart olmaksızın projeyi feshetme hakkı bulunmaktadır.'}
        ]
    }
};

// --- Ana Uygulama Komponenti ---
function App() {
    const [data, setData] = useState(initialData);

    const updateData = (path, value) => {
        setData(prevData => {
            const keys = path.split('.');
            const newData = JSON.parse(JSON.stringify(prevData)); // Deep copy
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };
    
    const moveItemInArray = (path, fromIndex, toIndex) => {
         setData(prevData => {
            const keys = path.split('.');
            const newData = JSON.parse(JSON.stringify(prevData)); // Deep copy
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            const array = current[keys[keys.length - 1]];
            if (toIndex < 0 || toIndex >= array.length) return prevData;
            const [movedItem] = array.splice(fromIndex, 1);
            array.splice(toIndex, 0, movedItem);
            current[keys[keys.length - 1]] = array;
            return newData;
        });
    }

    return (
        <div className="min-h-screen bg-gray-200 font-sans">
            <header className="bg-white shadow-md p-4 text-center sticky top-0 z-10">
                <h1 className="text-2xl font-bold text-indigo-700">Dinamik Teklif Oluşturma Aracı</h1>
                <p className="text-gray-600">Teklif içeriğini soldan düzenleyin, sonucu sağda anlık olarak görün.</p>
            </header>
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                <Controls data={data} updateData={updateData} moveItemInArray={moveItemInArray} setData={setData} />
                <Preview data={data} />
            </main>
        </div>
    );
}

// --- Kontrol Paneli Komponenti ---
function Controls({ data, updateData, moveItemInArray, setData }) {
    const fileInputRef = useRef(null);

    const handleSave = () => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `teklif-${data.proposal.number || 'yeni'}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleLoadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target.result;
                const parsedData = JSON.parse(content);
                setData(parsedData); // Update the entire state
            } catch (error) {
                console.error("Error parsing JSON file:", error);
                alert("Hata: Geçersiz JSON dosyası.");
            }
        };
        reader.readAsText(file);
        event.target.value = null; // Reset file input
    };
    
    // Generic list manipulation functions
    const handleItemChange = (path, index, field, value) => {
        const list = getNested(data, path);
        const newList = [...list];
        newList[index][field] = value;
        updateData(path, newList);
    };

    const handleTaskChange = (path, itemIndex, taskIndex, value) => {
        const list = getNested(data, path);
        const newList = [...list];
        newList[itemIndex].tasks[taskIndex] = value;
        updateData(path, newList);
    };

    const addItem = (path, newItem) => {
        const list = getNested(data, path);
        updateData(path, [...list, { ...newItem, id: Date.now() }]);
    };

    const removeItem = (path, index) => {
        const list = getNested(data, path);
        updateData(path, list.filter((_, i) => i !== index));
    };
    
    const addTask = (path, itemIndex, newTask) => {
        const list = getNested(data, path);
        const newList = [...list];
        newList[itemIndex].tasks.push(newTask);
        updateData(path, newList);
    };

    const removeTask = (path, itemIndex, taskIndex) => {
        const list = getNested(data, path);
        const newList = [...list];
        newList[itemIndex].tasks.splice(taskIndex, 1);
        updateData(path, newList);
    };

    const moveTask = (path, itemIndex, from, to) => {
        const list = getNested(data, path);
        const newList = [...list];
        const tasks = newList[itemIndex].tasks;
        if (to < 0 || to >= tasks.length) return;
        const [moved] = tasks.splice(from, 1);
        tasks.splice(to, 0, moved);
        updateData(path, newList);
    };

    const getNested = (obj, path) => path.split('.').reduce((acc, part) => acc && acc[part], obj);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-[calc(100vh-100px)]">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Kontrol Paneli</h2>
            <div className="space-y-6">
                 <ControlSection title="Tema & Dışa Aktarma">
                    <div className="flex items-center justify-between">
                        <label htmlFor="themeColor" className="font-medium text-gray-600">Ana Renk</label>
                        <input type="color" id="themeColor" value={data.themeColor} onChange={e => updateData('themeColor', e.target.value)} className="w-12 h-8 border-none cursor-pointer" />
                    </div>
                    <div className="flex space-x-2 mt-2">
                        <button onClick={handleSave} className="flex-1 flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"><SaveIcon /> Kaydet</button>
                        <button onClick={handleLoadClick} className="flex-1 flex items-center justify-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"><LoadIcon /> Yükle</button>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
                    </div>
                </ControlSection>

                <ControlSection title="Genel Bilgiler">
                    <InputField label="Teklif No" value={data.proposal.number} onChange={e => updateData('proposal.number', e.target.value)} />
                    <InputField label="Teklif Tarihi" value={data.proposal.date} onChange={e => updateData('proposal.date', e.target.value)} />
                </ControlSection>

                <ControlSection title="Firma ve Müşteri Bilgileri">
                    <InputField label="Firma Adı" value={data.company.name} onChange={e => updateData('company.name', e.target.value)} />
                    <InputField label="Müşteri Adı" value={data.client.name} onChange={e => updateData('client.name', e.target.value)} />
                    <InputField label="Müşteri Firma" value={data.client.company} onChange={e => updateData('client.company', e.target.value)} />
                </ControlSection>

                <ControlSection title="Fiyatlandırma Ayarları">
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-2">Gösterilecek Seçenekler</h4>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={data.pricing.showHourlyOption} onChange={e => updateData('pricing.showHourlyOption', e.target.checked)} className="rounded" />
                                <span className="text-sm">Saatlik Ödeme Seçeneği</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={data.pricing.showFixedOption} onChange={e => updateData('pricing.showFixedOption', e.target.checked)} className="rounded" />
                                <span className="text-sm">Sabit Fiyat (50% - 50%) Seçeneği</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={data.pricing.showThreePhaseOption} onChange={e => updateData('pricing.showThreePhaseOption', e.target.checked)} className="rounded" />
                                <span className="text-sm">Üç Aşamalı (30% - 40% - 30%) Seçeneği</span>
                            </label>
                        </div>
                    </div>
                    <InputField type="number" label="Saatlik Ücret ($)" value={data.pricing.hourlyRate} onChange={e => updateData('pricing.hourlyRate', parseFloat(e.target.value) || 0)} />
                    <InputField type="number" label="Tahmini Saat" value={data.pricing.estimatedHours} onChange={e => updateData('pricing.estimatedHours', parseInt(e.target.value) || 0)} />
                    <InputField type="number" label="Sabit Fiyat ($)" value={data.pricing.fixedPrice} onChange={e => updateData('pricing.fixedPrice', parseFloat(e.target.value) || 0)} />
                    <InputField type="number" label="KDV Oranı (%)" value={data.pricing.vatRate} onChange={e => updateData('pricing.vatRate', parseFloat(e.target.value) || 0)} />
                </ControlSection>

                <ControlSection title="Giriş Metni">
                    <p className="text-xs text-gray-500 mb-2">Dinamik alanlar: {`{clientName}`}, {`{clientCompany}`}, {`{companyName}`}</p>
                    <TextAreaField label="Metin" value={data.introductionText} onChange={e => updateData('introductionText', e.target.value)} rows={8} />
                </ControlSection>

                <ControlSection title="Bölüm Sıralaması">
                    <p className="text-sm text-gray-500 mb-2">Bölümleri okları kullanarak yeniden sıralayabilirsiniz.</p>
                    <ReorderableList items={data.sections} onMove={(from, to) => moveItemInArray('sections', from, to)} renderItem={item => <span className="font-semibold">{item.title}</span>} />
                </ControlSection>
                
                <EditableSection
                    title="Proje Kapsamı Detayları"
                    path="scopeDetails.items"
                    items={data.scopeDetails.items}
                    onAddItem={() => addItem('scopeDetails.items', { title: 'Yeni Kapsam Maddesi', tasks: ['Yeni görev...'] })}
                    onRemoveItem={(index) => removeItem('scopeDetails.items', index)}
                    onMoveItem={(from, to) => moveItemInArray('scopeDetails.items', from, to)}
                    onItemChange={(index, field, value) => handleItemChange('scopeDetails.items', index, field, value)}
                    renderItemEditor={(item, index) => (
                        <TaskBasedEditor
                            item={item}
                            itemIndex={index}
                            path="scopeDetails.items"
                            onItemChange={handleItemChange}
                            onTaskChange={handleTaskChange}
                            onAddTask={addTask}
                            onRemoveTask={removeTask}
                            onMoveTask={moveTask}
                        />
                    )}
                />

                <EditableSection
                    title="Proje Planı Detayları"
                    path="planDetails.sprints"
                    items={data.planDetails.sprints}
                    onAddItem={() => addItem('planDetails.sprints', { title: 'Yeni Sprint', tasks: ['Yeni görev...'] })}
                    onRemoveItem={(index) => removeItem('planDetails.sprints', index)}
                    onMoveItem={(from, to) => moveItemInArray('planDetails.sprints', from, to)}
                    onItemChange={(index, field, value) => handleItemChange('planDetails.sprints', index, field, value)}
                    renderItemEditor={(item, index) => (
                        <TaskBasedEditor
                            item={item}
                            itemIndex={index}
                            path="planDetails.sprints"
                            onItemChange={handleItemChange}
                            onTaskChange={handleTaskChange}
                            onAddTask={addTask}
                            onRemoveTask={removeTask}
                            onMoveTask={moveTask}
                        />
                    )}
                />

                <EditableSection
                    title="Genel Şartlar ve Koşullar"
                    path="termsDetails.items"
                    items={data.termsDetails.items}
                    onAddItem={() => addItem('termsDetails.items', { text: 'Yeni şart...' })}
                    onRemoveItem={(index) => removeItem('termsDetails.items', index)}
                    onMoveItem={(from, to) => moveItemInArray('termsDetails.items', from, to)}
                    onItemChange={(index, field, value) => handleItemChange('termsDetails.items', index, field, value)}
                    renderItemEditor={(item, index) => (
                        <InputField label={`Madde ${index + 1}`} value={item.text} onChange={e => handleItemChange('termsDetails.items', index, 'text', e.target.value)} />
                    )}
                />

            </div>
        </div>
    );
}

// --- Generic Control Components ---
const ControlSection = ({ title, children }) => (
    <div className="p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">{title}</h3>
        <div className="space-y-3">{children}</div>
    </div>
);

const InputField = ({ label, ...props }) => (
    <div>
        {label && <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>}
        <input {...props} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
    </div>
);

const TextAreaField = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <textarea {...props} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
    </div>
);

const ReorderableList = ({ items, onMove, renderItem }) => (
    <div className="space-y-2">
        {items.map((item, index) => (
            <div key={item.id || index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                {renderItem(item, index)}
                <div className="flex items-center space-x-1">
                    <button onClick={() => onMove(index, index - 1)} disabled={index === 0} className="p-1 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"><ArrowUpIcon/></button>
                    <button onClick={() => onMove(index, index + 1)} disabled={index === items.length - 1} className="p-1 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"><ArrowDownIcon/></button>
                </div>
            </div>
        ))}
    </div>
);

const EditableSection = ({ title, path, items, onAddItem, onRemoveItem, onMoveItem, onItemChange, renderItemEditor }) => (
    <ControlSection title={title}>
        {items.map((item, index) => (
            <div key={item.id} className="relative p-4 border rounded-md pt-8">
                <div className="absolute top-2 right-2 flex items-center">
                    <button onClick={() => onMoveItem(index, index - 1)} disabled={index === 0} className="p-1 hover:text-indigo-600 disabled:opacity-50"><ArrowUpIcon/></button>
                    <button onClick={() => onMoveItem(index, index + 1)} disabled={index === items.length - 1} className="p-1 hover:text-indigo-600 disabled:opacity-50"><ArrowDownIcon/></button>
                    <button onClick={() => onRemoveItem(index)} className="p-1 text-red-500 hover:text-red-700"><TrashIcon/></button>
                </div>
                {renderItemEditor(item, index)}
            </div>
        ))}
        <button onClick={onAddItem} className="text-sm flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 mt-2"><PlusIcon/> <span>Yeni Madde Ekle</span></button>
    </ControlSection>
);

const TaskBasedEditor = ({ item, itemIndex, path, onItemChange, onTaskChange, onAddTask, onRemoveTask, onMoveTask }) => (
    <>
        <InputField label="Başlık" value={item.title} onChange={e => onItemChange(path, itemIndex, 'title', e.target.value)} />
        <h4 className="font-semibold mt-3 mb-1 text-sm">Görevler:</h4>
        {item.tasks.map((task, taskIndex) => (
            <div key={taskIndex} className="flex items-center space-x-2 mb-2">
                <input type="text" value={task} onChange={e => onTaskChange(path, itemIndex, taskIndex, e.target.value)} className="flex-grow p-1 border rounded w-full"/>
                <div className="flex">
                    <button onClick={() => onMoveTask(path, itemIndex, taskIndex, taskIndex - 1)} disabled={taskIndex === 0} className="p-1 hover:text-indigo-600 disabled:opacity-50"><ArrowUpIcon/></button>
                    <button onClick={() => onMoveTask(path, itemIndex, taskIndex, taskIndex + 1)} disabled={taskIndex === item.tasks.length - 1} className="p-1 hover:text-indigo-600 disabled:opacity-50"><ArrowDownIcon/></button>
                    <button onClick={() => onRemoveTask(path, itemIndex, taskIndex)} className="p-1 text-red-500 hover:text-red-700"><TrashIcon/></button>
                </div>
            </div>
        ))}
        <button onClick={() => onAddTask(path, itemIndex, 'Yeni görev...')} className="text-sm flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 mt-2"><PlusIcon/> <span>Görev Ekle</span></button>
    </>
);

// --- Önizleme Komponenti ---
function Preview({ data }) {
    
    const handlePrint = () => {
        const printContents = document.getElementById('preview-content').innerHTML;
        const style = `<style>
            body { 
                font-family: 'Inter', sans-serif; 
                --theme-color: ${data.themeColor};
                --theme-color-light: ${hexToRgba(data.themeColor, 0.05)};
                --theme-color-ring: ${hexToRgba(data.themeColor, 0.5)};
            }
            .section-title { border-bottom: 2px solid var(--theme-color); padding-bottom: 8px; margin-bottom: 24px; }
            @media print {
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .no-break-inside { page-break-inside: avoid; }
            }
        </style>`;
        const tailwind = '<script src="https://cdn.tailwindcss.com"></script>';
        const win = window.open('data:text/html,', '_blank');
        win.document.write(`<html><head><title></title>${tailwind}${style}</head><body>${printContents}</body></html>`);
        win.document.close();
        setTimeout(() => { 
            win.focus();
            win.print(); 
        }, 500);
    };

    const renderSection = (section, sectionNumber) => {
        switch(section.component) {
            case 'Introduction': return <IntroductionSection data={data} title={section.title} />;
            case 'Scope': return <ScopeSection data={data} index={sectionNumber} title={section.title} />;
            case 'Pricing': return <PricingSection data={data} index={sectionNumber} title={section.title} />;
            case 'Plan': return <PlanSection data={data} index={sectionNumber} title={section.title} />;
            case 'Terms': return <TermsSection data={data} index={sectionNumber} title={section.title} />;
            default: return null;
        }
    };

    let sectionCounter = 0;

    const hexToRgba = (hex, alpha) => {
        if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) return `rgba(0,0,0,${alpha})`;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const themeStyles = {
        '--theme-color': data.themeColor,
        '--theme-color-light': hexToRgba(data.themeColor, 0.05),
        '--theme-color-ring': hexToRgba(data.themeColor, 0.5),
    };

    return (
        <div className="bg-white rounded-lg shadow-lg relative">
            <button onClick={handlePrint} style={{backgroundColor: data.themeColor}} className="absolute top-4 right-4 text-white p-2 rounded-full hover:opacity-80 transition-all shadow-lg print:hidden">
                <PrintIcon />
            </button>
            <div id="preview-content" style={themeStyles} className="p-4 sm:p-8 max-w-4xl mx-auto overflow-y-auto max-h-[calc(100vh-100px)]">
                {/* Header */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
                    <div>
                        <h1 style={{color: data.themeColor}} className="text-3xl sm:text-4xl font-bold">{data.company.name}</h1>
                        <p className="text-gray-500">{data.company.slogan}</p>
                    </div>
                    <div className="text-left sm:text-right mt-4 sm:mt-0">
                        <h2 className="text-2xl font-semibold text-gray-700">Proje Teklifi</h2>
                        <p className="text-sm text-gray-500">Tarih: {data.proposal.date}</p>
                        <p className="text-sm text-gray-500">Teklif No: {data.proposal.number}</p>
                    </div>
                </header>
                {/* Client Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-600 mb-2">Teklif Hazırlayan</h3>
                        <p className="font-bold">{data.company.name}</p>
                        <p>{data.company.email}</p>
                        <p>{data.company.phone}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-600 mb-2">Teklif Sunulan</h3>
                        <p className="font-bold">{data.client.name}</p>
                        <p>{data.client.company}</p>
                    </div>
                </div>

                {/* Dynamic Sections */}
                {data.sections.map((section) => {
                    if (section.id !== 'introduction') sectionCounter++;
                    return (
                        <div key={section.id}>
                            {renderSection(section, sectionCounter)}
                        </div>
                    )
                })}

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t-2 border-gray-200 text-center">
                    <p className="text-lg font-semibold">Projenizde çözüm ortağınız olmayı dileriz.</p>
                    <p className="text-gray-600 mt-2">Saygılarımızla,</p>
                    <p style={{color: data.themeColor}} className="text-2xl font-bold mt-4">{data.company.name}</p>
                </footer>
            </div>
        </div>
    );
}

// --- Preview Section Components ---
const SectionWrapper = ({ title, children }) => (
    <section className="mb-12 no-break-inside">
        <h2 style={{borderColor: 'var(--theme-color)'}} className="text-2xl font-bold border-b-2 pb-2 mb-6 section-title">{title}</h2>
        {children}
    </section>
);

const IntroductionSection = ({ data, title }) => {
    const processedText = data.introductionText
        .replace(/{clientName}/g, data.client.name.split(' ')[0])
        .replace(/{clientCompany}/g, data.client.company)
        .replace(/{companyName}/g, data.company.name)
        .split('\n').map((line, i) => <p key={i} className="mb-4">{line}</p>);

    return <SectionWrapper title={title}>{processedText}</SectionWrapper>;
};

const ScopeSection = ({ data, index, title }) => (
    <SectionWrapper title={`${index}. ${title}`}>
        <p className="mb-6">Teknik dökümanlarda belirtilen ihtiyaçlar doğrultusunda, projenin ana hatları aşağıdaki gibidir. Tahmini proje süresi <strong>{data.scopeDetails.duration}</strong> olarak öngörülmektedir.</p>
        <div className="space-y-4">
            {data.scopeDetails.items.map((item, idx) => (
                <details key={item.id} className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 no-break-inside" open>
                    <summary className="font-semibold text-lg">{item.title}</summary>
                    <ul className="list-disc list-inside mt-3 text-gray-700 space-y-2">
                        {item.tasks.map((task, taskIndex) => <li key={taskIndex}>{task}</li>)}
                    </ul>
                </details>
            ))}
        </div>
    </SectionWrapper>
);

const PricingSection = ({ data, index, title }) => {
    const { hourlyRate, estimatedHours, fixedPrice, vatRate, showHourlyOption, showFixedOption, showThreePhaseOption } = data.pricing;
    const vatMultiplier = 1 + (vatRate / 100);
    const hourlyTotal = hourlyRate * estimatedHours * vatMultiplier;
    const fixedTotal = fixedPrice * vatMultiplier;
    const fixedVatAmount = fixedPrice * (vatRate / 100);
    const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

    // Count visible options to determine grid layout
    const visibleOptions = [showHourlyOption, showFixedOption, showThreePhaseOption].filter(Boolean).length;
    const gridColsClass = visibleOptions === 1 ? 'grid-cols-1' : visibleOptions === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';
    
    // Determine which is recommended (first fixed option)
    const recommendedOption = showFixedOption ? 'fixed' : showThreePhaseOption ? 'threePhase' : showHourlyOption ? 'hourly' : null;

    if (visibleOptions === 0) {
        return (
            <SectionWrapper title={`${index}. ${title}`}>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">Hiçbir fiyatlandırma seçeneği seçilmemiş. Lütfen kontrol panelinden en az bir seçenek işaretleyin.</p>
                </div>
            </SectionWrapper>
        );
    }

    return (
        <SectionWrapper title={`${index}. ${title}`}>
            <p className="mb-6">Projeniz için esnek ödeme koşulları sunuyoruz. {visibleOptions > 1 ? `Aşağıdaki ${visibleOptions} farklı modelden birini tercih edebilirsiniz.` : 'Aşağıdaki ödeme koşullarını sunuyoruz.'} Tüm sabit fiyatlı teklifler %{vatRate} KDV dahil olarak hesaplanmıştır.</p>
            <div className={`grid grid-cols-1 ${gridColsClass} print:${gridColsClass} gap-6`}>
                {showHourlyOption && (
                    <div className={`border-2 rounded-lg p-6 flex flex-col no-break-inside ${recommendedOption === 'hourly' ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}>
                        {recommendedOption === 'hourly' && <span style={{backgroundColor: 'var(--theme-color)'}} className="text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-3">Önerilen</span>}
                        <h3 style={{color: 'var(--theme-color)'}} className="text-xl font-bold mb-2">Seçenek: Saatlik Ödeme</h3>
                        <p className="text-gray-600 mb-4 flex-grow">Proje boyunca çalışılan toplam saat üzerinden faturalandırma yapılır.</p>
                        <div className="text-center bg-gray-100 p-4 rounded-lg">
                            <p className="text-3xl font-bold">{formatCurrency(hourlyRate)} <span className="text-lg font-normal">/ saat + KDV</span></p>
                            <p className="text-sm text-gray-500 mt-1">Tahmini Proje Süresi: ~{estimatedHours} Saat</p>
                            <p className="text-sm text-gray-500">Tahmini Toplam: ~{formatCurrency(hourlyTotal)} (KDV Dahil)</p>
                        </div>
                    </div>
                )}
                {showFixedOption && (
                    <div className={`border-2 rounded-lg p-6 flex flex-col no-break-inside ${recommendedOption === 'fixed' ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`} style={recommendedOption === 'fixed' ? {borderColor: 'var(--theme-color)', boxShadow: `0 0 0 2px var(--theme-color-ring)`} : {}}>
                        {recommendedOption === 'fixed' && <span style={{backgroundColor: 'var(--theme-color)'}} className="text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-3">Önerilen</span>}
                        <h3 style={{color: 'var(--theme-color)'}} className="text-xl font-bold mb-2">Seçenek: Sabit Fiyat (50% - 50%)</h3>
                        <p className="text-gray-600 mb-4 flex-grow">Proje için net bir bütçe belirlemenizi sağlar.</p>
                        <div style={recommendedOption === 'fixed' ? {backgroundColor: 'var(--theme-color-light)'} : {}} className="text-center p-4 rounded-lg bg-gray-100">
                            <p className="text-3xl font-bold">{formatCurrency(fixedTotal)} <span className="text-lg font-normal">Toplam (KDV Dahil)</span></p>
                            <p className="text-sm text-gray-500 mt-1">({formatCurrency(fixedPrice)} + {formatCurrency(fixedVatAmount)} KDV)</p>
                            <p className="text-sm text-gray-500 mt-2 font-semibold">Başlangıç: {formatCurrency(fixedTotal / 2)}</p>
                            <p className="text-sm text-gray-500 font-semibold">Teslimat: {formatCurrency(fixedTotal / 2)}</p>
                        </div>
                    </div>
                )}
                {showThreePhaseOption && (
                    <div className={`border-2 rounded-lg p-6 flex flex-col no-break-inside ${recommendedOption === 'threePhase' ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}>
                        {recommendedOption === 'threePhase' && <span style={{backgroundColor: 'var(--theme-color)'}} className="text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-3">Önerilen</span>}
                        <h3 style={{color: 'var(--theme-color)'}} className="text-xl font-bold mb-2">Seçenek: Sabit Fiyat (30% - 40% - 30%)</h3>
                        <p className="text-gray-600 mb-4 flex-grow">Ödemeyi proje takvimindeki önemli kilometre taşlarına göre üç aşamaya böler.</p>
                        <div className="text-center bg-gray-100 p-4 rounded-lg">
                            <p className="text-3xl font-bold">{formatCurrency(fixedTotal)} <span className="text-lg font-normal">Toplam (KDV Dahil)</span></p>
                            <p className="text-sm text-gray-500 mt-1">({formatCurrency(fixedPrice)} + {formatCurrency(fixedVatAmount)} KDV)</p>
                            <p className="text-sm text-gray-500 mt-2 font-semibold">Başlangıç: {formatCurrency(fixedTotal * 0.3)}</p>
                            <p className="text-sm text-gray-500 font-semibold">Ara Teslim*: {formatCurrency(fixedTotal * 0.4)}</p>
                            <p className="text-sm text-gray-500 font-semibold">Final Teslim: {formatCurrency(fixedTotal * 0.3)}</p>
                        </div>
                    </div>
                )}
            </div>
            {showThreePhaseOption && <p className="text-xs text-gray-500 mt-4">*Ara teslim: 2. Sprint sonunda, QR kod özelliklerinin tamamlanıp onaylanmasını takiben.</p>}
        </SectionWrapper>
    );
};

const PlanSection = ({ data, index, title }) => (
    <SectionWrapper title={`${index}. ${title}`}>
        <p className="mb-6">Proje, Agile metodolojisi ile 2 haftalık Sprint'ler halinde yönetilecektir. Toplam {data.planDetails.sprints.length} Sprint'ten oluşan bir çalışma planı öngörülmektedir. Her Sprint sonunda bir demo ve değerlendirme toplantısı yapılacaktır.</p>
        <div className="space-y-4">
            {data.planDetails.sprints.map((sprint, idx) => (
                <div key={sprint.id} className="p-4 border rounded-lg no-break-inside">
                    <h4 className="font-bold text-lg">{sprint.title}</h4>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                        {sprint.tasks.map((task, taskIndex) => <li key={taskIndex}>{task}</li>)}
                    </ul>
                </div>
            ))}
        </div>
    </SectionWrapper>
);

const TermsSection = ({ data, index, title }) => (
    <SectionWrapper title={`${index}. ${title}`}>
        <ul className="list-disc list-inside text-gray-700 space-y-3">
            {data.termsDetails.items.map((item, idx) => (
                <li key={item.id} dangerouslySetInnerHTML={{ __html: item.text.replace(/(\d+)/g, '<strong>$1</strong>') }}></li>
            ))}
        </ul>
    </SectionWrapper>
);


export default App;
