"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";

type ItemCategory =
  | "حلويات"
  | "فطائر"
  | "مقبلات"
  | "مشروبات"
  | "ساندويتش"
  | "إفطار";

type MenuCategory = "الكل" | ItemCategory;

type MenuItem = {
  id: string;
  category: ItemCategory;
  name: string;
  description: string;
  price: number;
  badges?: string[];
  spicy?: boolean;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const WHATSAPP_NUMBER = "966500000000";

const categories: MenuCategory[] = [
  "الكل",
  "حلويات",
  "فطائر",
  "مقبلات",
  "مشروبات",
  "ساندويتش",
  "إفطار",
];

const menu: MenuItem[] = [
  {
    id: "salted-caramel-tart",
    category: "حلويات",
    name: "تارت الكراميل المملح",
    description: "طبقات مقرمشة من البسكويت الفاخر مع حشوة كراميل بحرية مالحة ولمسة شوكولاتة داكنة.",
    price: 32,
    badges: ["الأكثر طلباً", "موسمي"],
  },
  {
    id: "pistachio-cheesecake",
    category: "حلويات",
    name: "تشيز كيك الفستق",
    description: "جبنة كريمية مع فستق محمّص وعسل زهر البرتقال يقدم مع رذاذ كراميل.",
    price: 29,
    badges: ["جديد"],
  },
  {
    id: "zaatar-croissant",
    category: "فطائر",
    name: "كرواسون الزعتر الكريمي",
    description: "عجينة فرنسية بزبدة فاخرة محشوة بزعتر بلدي وجبن فيلادلفيا.",
    price: 21,
    badges: ["مفضل الشيف"],
  },
  {
    id: "truffle-fries",
    category: "مقبلات",
    name: "بطاطس الكمأة الذهبية",
    description: "شرائح بطاطس مقرمشة مغطاة بزيت الكمأة البري وبرش البارميزان.",
    price: 24,
  },
  {
    id: "spicy-shawarma",
    category: "ساندويتش",
    name: "ساندويتش شاورما الدجاج الحار",
    description: "دجاج متبل بخلطة حارة مع مخلل الخيار وصوص الطحينة المدخن.",
    price: 27,
    spicy: true,
  },
  {
    id: "signature-mocktail",
    category: "مشروبات",
    name: "كوكتيل حلو ومالح",
    description: "عصير ليمون مع أناناس، شراب الكراميل المملح وفحم نباتي يقدم مع نعناع طازج.",
    price: 19,
    badges: ["منعش"],
  },
  {
    id: "cardamom-latte",
    category: "مشروبات",
    name: "لاتيه الهيل الفاخر",
    description: "قهوة مختصة مع حليب مخمّر، هيل مطحون وكراميل مالدون.",
    price: 18,
  },
  {
    id: "halloumi-bites",
    category: "مقبلات",
    name: "لقيمات حلومي العسل",
    description: "مكعبات حلومي مقلية تقدم مع عسل الزعتر البري ونكهة الليمون.",
    price: 23,
  },
  {
    id: "black-seed-benedict",
    category: "إفطار",
    name: "بيض بندكت الحبة السوداء",
    description: "بيض مسلوق مع صوص هولنديز الحبة السوداء على خبز بريوش محمص.",
    price: 34,
  },
  {
    id: "roast-beef-panini",
    category: "ساندويتش",
    name: "بانيني روست بيف بالخل البلسمي",
    description: "شرائح روست بيف ناضجة مع جبنة جروفاي وصوص خردل العسل.",
    price: 31,
  },
  {
    id: "salted-caramel-brownie",
    category: "حلويات",
    name: "براوني الشوكولاتة المالحة",
    description: "شوكولاتة داكنة 70٪ مع حبات ملح مالي والكراميل السائل.",
    price: 17,
  },
  {
    id: "mushroom-flatbread",
    category: "فطائر",
    name: "فلات بريد الفطر البري",
    description: "خبز مسطح مخبوز بالحجر مع فطر موسمي، جرجير وصوص بارميزان أبيض.",
    price: 26,
  },
];

const highlights = [
  {
    title: "مذاق متوازن",
    description: "رحلة نكهات تجمع بين حلاوة العسل وملوحة البحر في كل لقمة.",
    icon: "✨",
  },
  {
    title: "إعداد فوري",
    description: "تحضير طازج عند الطلب مع تقنيات طهي حديثة لضمان الجودة.",
    icon: "⚡",
  },
  {
    title: "طلب بلمسة",
    description: "اختيار-سلة-ارسال عبر واتساب بضغطة واحدة بدون تعقيد.",
    icon: "📲",
  },
];

const processSteps = [
  {
    title: "اختر الأطباق",
    description: "تصفح قائمتنا وقم بإضافة ما يلهم حواسك إلى السلة.",
    icon: "🧾",
  },
  {
    title: "راجع سلتك",
    description: "عدّل الكميات ودوّن ملاحظاتك الخاصة لكل صنف.",
    icon: "🧺",
  },
  {
    title: "ارسل الطلب",
    description: "اضغط إرسال وسيصل فريقنا تفاصيل طلبك عبر واتساب فوراً.",
    icon: "📩",
  },
];

const testimonials = [
  {
    name: "ليان السبيعي",
    role: "مدونة طعام",
    quote:
      "أول تجربة لي مع حلو ومالح كانت ساحرة. توازن النكهات يثبت أن الفريق يفهم ذائقة الضيوف في كل تفاصيلها.",
  },
  {
    name: "عبدالله الحربي",
    role: "رائد أعمال",
    quote:
      "الخدمة عبر واتساب سهلة وسريعة. استلمنا الطلب بكامل حرارته وبنكهة تفتح النفس. شكراً على التجربة الفريدة!",
  },
];

const formatPrice = (value: number) =>
  value.toLocaleString("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  });

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>("الكل");
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredMenu = useMemo(() => {
    if (selectedCategory === "الكل") return menu;
    return menu.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const exists = prev.find((cartItem) => cartItem.id === item.id);
      if (exists) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [
        ...prev,
        { id: item.id, name: item.name, price: item.price, quantity: 1 },
      ];
    });
  };

  const updateQuantity = (id: string, amount: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + amount) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (!cart.length) return;
    const itemsText = cart
      .map(
        (item) =>
          `• ${item.name} × ${item.quantity} = ${formatPrice(item.price * item.quantity)}`,
      )
      .join("%0A");
    const message = `مرحباً حلو ومالح 👋%0Aأرغب في تأكيد طلبي:%0A${itemsText}%0A%0Aالمجموع: ${formatPrice(totalPrice)}%0A%0Aملاحظاتي:`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="absolute inset-0 -z-10 bg-grid-glow" aria-hidden />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-10 lg:px-10">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-emphasis shadow-glow">
            <span className="text-2xl font-bold text-black">ح/م</span>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">حلو ومالح</p>
            <p className="text-sm text-text-secondary">مع كل طعم لقمه</p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-text-secondary md:flex">
          <a className="transition hover:text-white" href="#menu">
            القائمة
          </a>
          <a className="transition hover:text-white" href="#process">
            خطوات الطلب
          </a>
          <a className="transition hover:text-white" href="#testimonials">
            آراء الضيوف
          </a>
          <a className="transition hover:text-white" href="#contact">
            تواصل معنا
          </a>
        </nav>
        <button
          className="hidden rounded-full border border-accent/30 bg-accent/10 px-6 py-2 text-sm font-medium text-accent md:inline-flex md:items-center md:gap-2"
          onClick={handleCheckout}
          type="button"
        >
          طلب سريع
          <span aria-hidden>↗</span>
        </button>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-32 lg:px-10">
        <section className="grid gap-12 rounded-3xl border border-border bg-surface/70 p-10 backdrop-blur">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-sm text-accent">
                تجربة طلب مميزة
              </span>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                حلو ومالح، حيث يلتقي الشغف بالحرفة في أطباق تُصنع لحظياً لك.
              </h1>
              <p className="text-lg text-text-secondary">
                اختر ما تشتهي، أضفه إلى سلتك، وارسل طلبك عبر واتساب ليصل فريقنا إليه فوراً. نحن هنا لنخلق لحظة طعام فاخرة تلائم ذائقتك.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <button
                  className="rounded-full bg-accent px-6 py-3 font-semibold text-black shadow-glow transition hover:bg-accent-emphasis"
                  onClick={() => {
                    document.getElementById("menu")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  type="button"
                >
                  اكتشف قائمتنا
                </button>
                <button
                  className="rounded-full border border-accent/40 px-6 py-3 font-semibold text-accent transition hover:border-accent hover:text-white"
                  onClick={handleCheckout}
                  type="button"
                >
                  أكمل الطلب
                </button>
              </div>
            </div>
            <div className="grid gap-4 rounded-3xl border border-border bg-background/60 p-6 text-sm text-text-secondary shadow-2xl shadow-black/30">
              <div className="space-y-2">
                <p className="text-xs text-accent/80">نظام الطلب</p>
                <p className="text-base text-white">
                  واتساب فوري، بدون تسجيل أو انتظار طويل.
                </p>
              </div>
              <div className="grid gap-2 rounded-2xl border border-border/60 bg-surface/60 p-4">
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>آخر طلب جاهز</span>
                  <span>قبل ٥ دقائق</span>
                </div>
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>مدة التحضير</span>
                  <span>١٥ دقيقة</span>
                </div>
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>عدد الأصناف اليوم</span>
                  <span>{menu.length}</span>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-accent/20 bg-accent/10 p-4">
                <div>
                  <p className="text-sm text-white">مجموع سلتك الحالي</p>
                  <p className="text-lg font-semibold text-accent">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-black text-lg font-bold">
                  {totalItems}
                </span>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-border/70 bg-background/50 p-5"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-xl">
                  {highlight.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {highlight.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="menu" className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">قائمتنا المختارة</h2>
              <p className="text-sm text-text-secondary">
                أصناف محدّثة يومياً بإلهام من المطبخ العالمي ولمسات سعودية أصيلة.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <div className="flex items-center gap-2 rounded-full border border-border/80 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                متاح الآن
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border/80 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-red-500/80" />
                حار
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={clsx(
                    "rounded-full border px-5 py-2 text-sm transition",
                    isActive
                      ? "border-accent bg-accent text-black shadow-glow"
                      : "border-border bg-surface/60 text-text-secondary hover:border-accent/60 hover:text-white",
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredMenu.map((item) => (
              <article
                key={item.id}
                className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-surface/70 p-6 transition hover:border-accent/50 hover:shadow-glow"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span className="rounded-full border border-border/80 px-3 py-1">
                      {item.category}
                    </span>
                    {item.spicy && (
                      <span className="rounded-full border border-red-500/50 px-3 py-1 text-red-400">
                        حار
                      </span>
                    )}
                    {item.badges?.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-accent"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-lg font-semibold text-accent">
                    {formatPrice(item.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(item)}
                    className="rounded-full border border-accent/60 px-5 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-black"
                  >
                    أضف للسلة
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="process"
          className="grid gap-6 rounded-3xl border border-border bg-surface/70 p-10"
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">كيف نعتني بطلبك</h2>
            <p className="text-sm text-text-secondary">
              بثلاث خطوات واضحة ينطلق طلبك من قائمتنا إلى طاولتك عبر واتساب.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-3xl border border-border/80 bg-background/50 p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-xl">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary">{step.description}</p>
                <span className="absolute left-6 top-6 text-5xl font-black text-text-secondary/10">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          id="testimonials"
          className="grid gap-6 rounded-3xl border border-border bg-surface/70 p-10"
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">ماذا يقول ضيوفنا</h2>
            <p className="text-sm text-text-secondary">
              نعتز بكل تجربة، ونسعد بأن نكون جزءاً من لحظة استمتاعكم بالطعام.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.name}
                className="flex h-full flex-col justify-between rounded-3xl border border-border/80 bg-background/60 p-6 text-sm leading-relaxed text-text-secondary"
              >
                <p className="text-lg text-white">“{testimonial.quote}”</p>
                <div className="mt-6">
                  <p className="text-base font-semibold text-accent">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {testimonial.role}
                  </p>
                </div>
              </blockquote>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="grid gap-6 rounded-3xl border border-accent/20 bg-gradient-to-br from-background/80 via-surface/80 to-background/80 p-10"
        >
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold">جاهزون دائماً لخدمتكم</h2>
            <p className="text-sm text-text-secondary">
              نتشرف بخدمتكم يومياً من ٨ صباحاً حتى ١٢ منتصف الليل. يمكنكم التعديل على طلبكم أو تحديد وقت الاستلام عند الإرسال عبر واتساب.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
              <span>📍</span>
              الرياض - حي اليرموك
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
              <span>⏰</span>
              ٨ ص - ١٢ ص يومياً
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
              <span>☎️</span>
              {WHATSAPP_NUMBER}
            </div>
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-lg font-semibold text-black shadow-glow transition hover:bg-accent-emphasis md:w-auto"
          >
            أرسل طلبك الآن
            <span aria-hidden>⟶</span>
          </button>
        </section>
      </main>

      <aside className="fixed bottom-6 left-6 right-6 z-50 mx-auto max-w-4xl rounded-3xl border border-accent/20 bg-background/80 p-5 backdrop-blur lg:bottom-10 lg:left-auto lg:right-10 lg:w-96">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">سلة الطلب</p>
            <p className="text-lg font-semibold text-white">
              {totalItems} أصناف • {formatPrice(totalPrice)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            disabled={!cart.length}
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black transition hover:bg-accent-emphasis disabled:cursor-not-allowed disabled:bg-text-secondary/30 disabled:text-background/60"
          >
            تأكيد عبر واتساب
          </button>
        </div>
        {cart.length ? (
          <div className="mt-4 space-y-3 max-h-60 overflow-y-auto pr-2 text-sm">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-border/70 bg-surface/70 p-3"
              >
                <div>
                  <p className="text-white">{item.name}</p>
                  <p className="text-xs text-text-secondary">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-border/80">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="h-8 w-8 text-lg text-text-secondary transition hover:text-white"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm text-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="h-8 w-8 text-lg text-text-secondary transition hover:text-white"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-400 transition hover:text-red-300"
                  >
                    إزالة
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-xs text-text-secondary">
            أضف أطباقك المفضلة وسيظهر الملخص هنا لإرسال الطلب مباشرة عبر واتساب.
          </p>
        )}
      </aside>

      <footer className="mx-auto mt-24 w-full max-w-6xl px-6 pb-16 text-xs text-text-secondary lg:px-10">
        <div className="flex flex-col items-start gap-3 border-t border-border/60 pt-6 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} حلو ومالح. جميع الحقوق محفوظة.</p>
          <p className="text-text-secondary/80">
            تجربة رقمية مصممة بعناية لعشاق الجمع بين الحلو والمالح.
          </p>
        </div>
      </footer>
    </div>
  );
}
