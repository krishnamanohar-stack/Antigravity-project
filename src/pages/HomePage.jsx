import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/common/ProductCard';

export default function HomePage() {
  const { allProducts, setSelectedCategory } = useProducts();
  const bestSellers = allProducts.filter((p) => p.isBestSeller).slice(0, 4);

  const categories = [
    { title: "Silk Sarees", slug: "silk-sarees", category: "Silk Sarees", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN6nAbczKpcLGF87Z6zw5aDQdGeGndCCYcs8JPABq3H4DtWKqbfGJ8QDTnw8m3m4HyjejZ_nuY8KYixl_lxMPTpSPCQ9hn3MmgfqxAD4Ku-sTIz1UPY1ZKM388hDOdll6DZvcMsJzgW5g1NDZ9bAemhu__5oMm7crJTpR5i5fDYwSW186pY3A1EXaSOQAklUN4mNz2OvEy4oFtTDmpClyv7enKLazqL4B44Mbd0XcGrg_GNG9PJVzGNA" },
    { title: "Cotton Sarees", slug: "cotton-sarees", category: "Cotton Sarees", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC3H8IeOEOcSZN3oN2D0DeywT0Dp_WD5agiMt0ULqy4A4lM0OxgbBY8qjLJXqEfDn-DBrfyEqvS5i4iNnePPaKIq2_qUfHwQRrxb8XULW6BStFrblvvN5NM8z2R3SopAUm6YQuJo5N-fF2M3M9fq69jCZVFRPWmMYbwLr3J5IsNFtfDTCHmxWN73FrIwFEmB2KLyMKZsJmvIQT8NQg7wFiORUoHcMK2KqwGn8YhqvE8TcA7dBDJ47wcw" },
    { title: "Banarasi Weaves", slug: "banarasi-weaves", category: "Banarasi Weaves", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPyGgJZ2uDNsnHg8lTrb63IlOra5qE3pci36fDFiN12DlniH2nwrmcynvsxfzs1uUoonoZRxC0wvofV6HnxUbfVhUVGhGw3REk1M6_gxxgXGopezA691y69Yjv8vf8WA9Fld85iajby04zDgVk4X79F6zK_Wkwb96Uj0oqgGZ0Smpeg4GGaJoo_cHtbclclGuoGqTndBtf0gQ-xRQTBB5Bl0tpZx0sZcAe7YqHy6u6jbax_qTSAC79rw" },
    { title: "Party Wear Dresses", slug: "party-wear-dresses", category: "Party Wear Dresses", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDb94DuPZv_13wfHbW6P5kOEAqqoR2MYIaa70szAMCkDo4DC9b0iKCDTwB-6PRKAB-A9a6rBF1DUk4YNv7q_GQSPXuAoNy_4LdI25L5cgadX9Y1AXSzbcrd2Qv21yywMpooxldkCqRsmApYob1AoOe4SradUpWTmtEi4lByy81mnc8WEKQgxky3yZpN-3-Hp-ZA2cbzA9NdiPuQV4t7ozPXAp6MCzRPvpxvM6W8F1QvuN6Pr0RmvRnEJA" },
    { title: "Designer Sarees", slug: "designer-sarees", category: "Designer Sarees", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlR0HI4-g9q3v5lODq3yLZmZxOrtlfwD0pt7lgpF9Pkkc37eiy4C6KUbYkH4-zD1Z8wGMnghDtwUcGX9IKvvyOBi5t2_X86SoQo6hiDapgmRrjFKWryFo76-lnfv2hYUC_qOGZtTpKEDTS_XfGv0ZnfCZH-LcSYnOaVzwWqJJIIF9w79_jTN8s6uNXaYjGr6-DFzOGBoBBGUxare24TUA9n7DXCQFYYTXMQDUxhBMNw-fAe_rM6b2yyg" },
    { title: "Ethnic Anarkalis", slug: "ethnic-anarkalis", category: "Ethnic Anarkalis", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPpPabXl2T_YkeXuTV6kAV8IRreLgAcUDz66JKyxySnjU0nGKdCq-Xso0B-fG_wQCf1Cy4tcaCpM9HkFVl3JTCuFzvid15mLzP6Llk4clHkilRkgYW8-CqtuUfIHIne2aCi9I2vWvGpdOXGadHH4GyRQoXrYWpdZhdmlw_zV9x5bo8Y0hG0nxhq8K_XEPlUKEJjpVbpOU5ES5qMmRwZf-n7qfp8PVJrlQJIqqG7dNT6c7mqmUIP6Ma4g" },
    { title: "Casual Kaftans", slug: "casual-kaftans", category: "Casual Kaftans", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuARxfkfrR7awTASVlpXjhQQfZyWsBx2Lhd6scb3wDAehSFA4t_cveSSrsDv1o4hdrfPL_C7h_rIT_ZiCYejtiRLvkuUHbmkZTGVsc5rF_19Iv8ZY18jWeSBIt2F9CK1bnWfKpAP5zcOmKaFqy80en_piedLmhNLM7c5Wc9YsSTgjtcSCVBmfaymYWLOHSzy7H7TfC4X3Mz3id_1t9mWfe5MHUluz-2jVB8e1r7eWoHEL6hltFQ_C3NpNw" },
    { title: "New Arrivals", slug: "new-arrivals", category: "New Arrivals", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsR16LjuirSA2syRfr4xbbAmNUVtiACZtZAw9c6nChOkMFhFxQVRWX0uZXATNWLGkH4HSS9SccVPQC1WedTxVwocTEcwg12sDfIxTcx0BNrkEaA4OFQy80nFj-06oqSMi_hr0I5m8_ZBN19FG_cX9Tm2Xt_J-PSu7qMYyMJTLagcupnf1nQZM9camyl4L44ly7Lr4PEm6QbVK9PaDqzqyLO59y0hyAHkjyGSqiTV8pRHMFxSOT2sWUFQ" }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-surface-container-low/60 pb-space-3xl pt-space-xl">
        <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-2xl items-center">
            {/* Left Column: Editorial Copy */}
            <div className="lg:col-span-6 flex flex-col items-start z-10">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs bg-secondary-container/40 text-on-secondary-container mb-space-md shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary">flare</span>
                <span className="font-label-caps text-label-caps tracking-[0.2em] uppercase font-semibold">The New Collection | Festive 2026</span>
              </div>
              <h1 className="font-display-hero text-display-hero-mobile lg:text-display-hero text-primary tracking-tight mb-space-md leading-[1.1]">
                Elegance, <br />
                <span className="italic font-normal font-title-editorial text-secondary">Woven for You</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-space-xl leading-relaxed">
                Discover timeless sarees and contemporary styles crafted for every celebration. Pure zari brocades and handspun georgettes by master Indian artisans, designed as timeless heirlooms.
              </p>
              <div className="flex flex-wrap items-center gap-space-md w-full sm:w-auto">
                <Link
                  to="/sarees"
                  onClick={() => setSelectedCategory('Sarees')}
                  className="inline-flex items-center justify-center bg-primary-container text-surface font-label-caps text-label-caps uppercase tracking-widest px-space-xl py-space-md hover:bg-primary transition-all shadow-md"
                >
                  <span>Discover Sarees</span>
                  <span className="material-symbols-outlined ml-space-xs text-[18px]">arrow_forward</span>
                </Link>
                <Link
                  to="/dresses"
                  onClick={() => setSelectedCategory('Dresses')}
                  className="inline-flex items-center justify-center bg-transparent text-primary font-label-caps text-label-caps uppercase tracking-widest px-space-xl py-space-md hover:bg-surface-container transition-all border border-primary/30"
                >
                  Explore Dresses
                </Link>
              </div>

              {/* Micro Atelier Stat Strip */}
              <div className="grid grid-cols-3 gap-space-lg pt-space-2xl mt-space-2xl bg-surface/50 w-full p-space-md shadow-sm border border-outline-variant/40">
                <div>
                  <p className="font-headline-sm text-headline-sm text-primary font-semibold">120+</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Loom Guilds</p>
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm text-primary font-semibold">100%</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Certified Pure Silk</p>
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm text-primary font-semibold">45 Days</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Artisan Weave Cycle</p>
                </div>
              </div>
            </div>

            {/* Right Column: Royal Editorial Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="absolute -top-12 -right-12 w-72 h-72 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
                <div className="relative bg-surface p-space-xs shadow-xl border border-outline-variant/40">
                  <div className="aspect-[3/4] overflow-hidden relative group">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcDcyLwDvf3dnXbOAj_p9lR4g8lPY8nwShu3KfS_5-rpoCgr5UnwINQggkOcvIKB6Jnn10Y7j3WVWvL0nPWrl8BNTlvYjHY9YaqL8hOI_sD0sMCXtIQZDDPfZ79ZjjZ2Eyv92eSu1yCLBqgNgBsLG6NeFOmldVZZlhUCBRRCc7p97GLjwyXPuGZbUbdiR88U0sCYxaWC0nK022qesNIVrSSs3XJM2W32RTsZnubblJ-mmiewcvhOQXFw"
                      alt="Regal Indian woman wearing crimson Banarasi silk saree"
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-40" />
                  </div>

                  {/* Floating Artisan Tag */}
                  <div className="absolute -bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm bg-surface-container-lowest p-space-md shadow-xl flex items-center gap-space-sm border border-outline-variant/60">
                    <div className="h-10 w-10 bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">verified</span>
                    </div>
                    <div>
                      <span className="font-label-caps text-[10px] uppercase text-secondary tracking-widest block font-bold">Authenticated Heritage</span>
                      <p className="font-title-editorial text-body-sm text-primary font-semibold leading-tight">100% Pure Mulberry Silk & Handspun Gold Zari</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="w-full py-space-4xl bg-background">
        <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl">
            <div>
              <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary block mb-space-xs font-semibold">Artisanal Wardrobe</span>
              <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary">Shop by Category</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-space-sm md:mt-0">
              Curated masterworks spanning indigenous handloom traditions, ceremonial silhouettes, and evening drapes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-md lg:gap-space-lg">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/collections/${cat.slug}`}
                onClick={() => setSelectedCategory(cat.category)}
                className="group flex flex-col bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-outline-variant/40"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-space-md flex flex-col justify-between flex-1">
                  <h3 className="font-headline-sm text-title-editorial text-primary group-hover:text-secondary transition-colors">
                    {cat.title}
                  </h3>
                  <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary mt-space-xs flex items-center gap-space-2xs">
                    Explore Collection <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED OCCASIONS */}
      <section className="w-full py-space-4xl bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="text-center max-w-2xl mx-auto mb-space-3xl">
            <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold block mb-space-xs">Couture Styling</span>
            <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary">Curated for Every Occasion</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">From sacred heritage pheras to high-society twilight receptions, discover ensembles bespoke to the moment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md lg:gap-space-lg">
            {/* Occasion 1: Royal Weddings */}
            <div className="md:col-span-7 relative group overflow-hidden bg-primary shadow-md min-h-[380px] lg:min-h-[460px] flex flex-col justify-end p-space-xl border border-secondary/20">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdbUDGFUPMSGd9cc8bqDQOg47TiYLscAGLuRp6g67lHCcbLOaeXnNJhmwNY1SiiNtTpk3IuB6mUCHkOXeRiT23IWLXEj2MiuHQKMrDY-PEl1pz-16bAWZWtnkPFNKuoxTeKt2SsqgBL8bvn5FkPC7VsDtVCMjS3BUCJVj0I1fh-2LaFjtl8orzCLJT1lGyAZg8S4U0X5GAdzN4AeIVAjmfYamSATLrzCxYxW-ovd3DSMqPeyx7j5oFJw')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              <div className="relative z-10 text-on-primary">
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed block mb-space-2xs">The Grand Chapter</span>
                <h3 className="font-headline-md text-headline-md font-normal mb-space-xs">Royal Weddings</h3>
                <p className="font-body-sm text-body-sm text-surface-variant max-w-md mb-space-md">Opulent heirlooms woven with pure silver and gold zari to commemorate eternal vows.</p>
                <Link to="/sarees" className="inline-flex items-center gap-space-xs font-label-caps text-label-caps uppercase tracking-widest text-on-primary hover:text-secondary-fixed transition-colors">
                  Explore Wedding Curations <span className="material-symbols-outlined text-[16px]">north_east</span>
                </Link>
              </div>
            </div>

            {/* Occasion 2: Bridal Troussau */}
            <div className="md:col-span-5 relative group overflow-hidden bg-primary shadow-md min-h-[380px] lg:min-h-[460px] flex flex-col justify-end p-space-xl border border-secondary/20">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXBOvA5OoZJthIzaoVTntTwhhj4dRLFFZYC1dj8jni4oZvmgbtfPlW_Png0fH_l23gDV7zXEhu3qdWuezOQlp25jcjlYFkewWQ4z9ixush3m6yy83LTTqLxPduLJSwTHyYmKnXm3Z0He_iGH4fzsN4TDVk-OexwPYT9qBd0VO66N498QBJDOoxvib2M5K1SWTmrQJHzncr3IjFOMaEuDtBs_bgiKsMp0893Jw7oiZYwwF65yfnR7Ptww')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              <div className="relative z-10 text-on-primary">
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed block mb-space-2xs">Heirloom Chest</span>
                <h3 className="font-headline-md text-headline-md font-normal mb-space-xs">Bridal Troussau</h3>
                <p className="font-body-sm text-body-sm text-surface-variant max-w-sm mb-space-md">Hand-selected sets designed for multi-day ceremonial drapes and enduring legacy.</p>
                <Link to="/sarees" className="inline-flex items-center gap-space-xs font-label-caps text-label-caps uppercase tracking-widest text-on-primary hover:text-secondary-fixed transition-colors">
                  View Troussau Suite <span className="material-symbols-outlined text-[16px]">north_east</span>
                </Link>
              </div>
            </div>

            {/* Occasion 3: Festive Celebrations */}
            <div className="md:col-span-4 relative group overflow-hidden bg-primary shadow-md min-h-[320px] flex flex-col justify-end p-space-lg border border-secondary/20">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCODln0Dmu8w1QKq-Bl1vHmUard61BlvyLn-YEaWqgk7_UeGX2mIBZNlAuNAjREY0YMxi5Tse968uiT06XWKRqsBKJB7gm9jpn883acI4x5MYZwGsE6_J5mfP7dMpqzUmjfic5WshzirvjNi3Xh5EvdrUkbX8vqD1yD_JDhppSJl5vp_mgEguXLzI2kWs2eOfwiVf6VykdTptLCI23dLMPOnphB66JZtl7Q7f74i6zFhtHmvHY0LMQmUw')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              <div className="relative z-10 text-on-primary">
                <h3 className="font-title-editorial text-headline-sm font-normal mb-space-2xs">Festive Celebrations</h3>
                <p className="font-body-sm text-body-sm text-surface-variant line-clamp-2 mb-space-sm">Radiant hues celebrating Diwali, Karwa Chauth, and auspicious pujas.</p>
                <Link to="/sarees" className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed flex items-center gap-1">Shop Festive <span className="material-symbols-outlined text-[14px]">arrow_forward</span></Link>
              </div>
            </div>

            {/* Occasion 4: Evening Soirée */}
            <div className="md:col-span-4 relative group overflow-hidden bg-primary shadow-md min-h-[320px] flex flex-col justify-end p-space-lg border border-secondary/20">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAl80ZMIcaeqeIyu8mpPhbZYRpR9XPj1DQQhNh3zOK3XChJq2bSQlRep5wTqeK4Po_bo7U25VD2Y2Q1cxMS4yksN5GSF2jt8vz7ij6E8cUcq8AmF_GlWslMvBbv3RkgirNlIkn9Lab1ooW2bmOW-ZWoQhGnVa23WeWkn-84qyZuQ811zZKwurjMwn2YAsgIE4P_SRnJu8Kr43ZE4gpZxeFI9CnFlFvzooDLpZqeQCmPclOtta8Hc2pxrw')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              <div className="relative z-10 text-on-primary">
                <h3 className="font-title-editorial text-headline-sm font-normal mb-space-2xs">Evening Soirée</h3>
                <p className="font-body-sm text-body-sm text-surface-variant line-clamp-2 mb-space-sm">Sensuous silhouettes, cocktail shimmer, and delicate metallic fringe drapes.</p>
                <Link to="/dresses" className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed flex items-center gap-1">Shop Soirée <span className="material-symbols-outlined text-[14px]">arrow_forward</span></Link>
              </div>
            </div>

            {/* Occasion 5: Work & Everyday Grace */}
            <div className="md:col-span-4 relative group overflow-hidden bg-primary shadow-md min-h-[320px] flex flex-col justify-end p-space-lg border border-secondary/20">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2_acF2_sRwY4nidEJ-kYDRNycn536_c4RU8rBhnT8K0ppyHObeZpXw5tr7TnSIA4IgIuXNVu5wBtP7NpCzFKKJ4v30YOUSLnaVN7Onfqj2rBkMNrmrF32xG51PvefgSCoeocnTNwJIqG3Jl7zHpomQDfTCJOGOfSNaM8Yhk3qRImkIGjQo-GGn0IuKsONs5jRLdBGIi5OSUFRHYrb9kKMmfZ-R5jY_z5OrrOKcQX84PcBU5oZI3VEig')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              <div className="relative z-10 text-on-primary">
                <h3 className="font-title-editorial text-headline-sm font-normal mb-space-2xs">Work & Everyday Grace</h3>
                <p className="font-body-sm text-body-sm text-surface-variant line-clamp-2 mb-space-sm">Lightweight linens, breathable chanderis, and understated elegance.</p>
                <Link to="/sarees" className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed flex items-center gap-1">Shop Everyday <span className="material-symbols-outlined text-[14px]">arrow_forward</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS */}
      <section className="w-full py-space-4xl bg-background">
        <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-2xl">
            <div>
              <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold block mb-space-xs">Patron Favorites</span>
              <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary">Best Sellers</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-2xs">Styles our patrons love most.</p>
            </div>
            <Link
              to="/collections/all"
              className="font-label-caps text-label-caps uppercase tracking-wider text-primary hover:text-secondary flex items-center gap-space-xs mt-space-md sm:mt-0 font-bold"
            >
              View Full Catalogue <span className="material-symbols-outlined text-[18px]">east</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. MASTER WEAVERS & ATELIER HERITAGE */}
      <section className="w-full py-space-4xl bg-surface-container-high border-t border-outline-variant/60">
        <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
            <div className="lg:col-span-5 space-y-space-md">
              <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-semibold">Living Heritage</span>
              <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary">
                Master Weavers & The Royal Atelier
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Every VANYA weave passes through the skilled hands of third-generation master artisans across Varanasi, Kanchipuram, and Chanderi.
              </p>
              <div className="space-y-space-xs font-body-md text-body-md text-on-surface-variant pt-space-xs">
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-1">task_alt</span>
                  <p><strong>Pure Silk Certification:</strong> Tested and certified by Silk Mark Organisation of India (SMOI).</p>
                </div>
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-1">task_alt</span>
                  <p><strong>Authentic Kadwa Weave:</strong> Hand-loomed with zero computer prints; takes 35 to 45 days per saree.</p>
                </div>
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-1">task_alt</span>
                  <p><strong>Bespoke Tailoring:</strong> Custom blouse stitching & fall-piko edging directly from our Hyderabad atelier.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-space-md">
              <div className="aspect-[3/4] bg-surface overflow-hidden shadow-md border border-outline-variant/40">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN6nAbczKpcLGF87Z6zw5aDQdGeGndCCYcs8JPABq3H4DtWKqbfGJ8QDTnw8m3m4HyjejZ_nuY8KYixl_lxMPTpSPCQ9hn3MmgfqxAD4Ku-sTIz1UPY1ZKM388hDOdll6DZvcMsJzgW5g1NDZ9bAemhu__5oMm7crJTpR5i5fDYwSW186pY3A1EXaSOQAklUN4mNz2OvEy4oFtTDmpClyv7enKLazqL4B44Mbd0XcGrg_GNG9PJVzGNA"
                  alt="Kanchipuram Silk Weave"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] bg-surface overflow-hidden shadow-md mt-space-xl border border-outline-variant/40">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkddJZ7JFkFbsOmMExe0HHBcwdQHjhvvYaCb1wnguG8UK1nS9j6Z4A_l7fH_I_f1-GQZjqTaRIpZYzBTQG_IqagxBWhR8u3VleoDiF5NuBx6Oh3y_Jv26Z7SNLwap45nB6xncA2dlZpP0XYHcas8q1Ihs--lB0EEfOvggkewJoRWakieKqqLqxZU46FG3D-QWRO8wVfeNjPvaIRlZWHli18P1Y_FY6PaS-lktMkcg7q25NLNasR_5PNw"
                  alt="Banarasi Kadwa Weave"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
