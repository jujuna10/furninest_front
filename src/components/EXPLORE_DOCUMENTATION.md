# Explore Component Documentation

## მიმოხილვა (Overview)

`Explore` კომპონენტი არის Next.js React კომპონენტი, რომელიც აჩვენებს ავეჯის კატეგორიებს ინტერაქტიული ბათენებით. მომხმარებელს შეუძლია გადართოს სხვადასხვა კატეგორიებს შორის და ნახოს შესაბამისი ავეჯის სია.

## ფუნქციონალი (Features)

- ✅ **ინტერაქტიული კატეგორიების ფილტრაცია** - 3 ბათენი: Living Room, Bedroom, Dining Room
- ✅ **დინამიური კონტენტი** - სხვადასხვა ავეჯის ნივთები კატეგორიის მიხედვით
- ✅ **ვიზუალური ინდიკატორი** - ქვედა progress bar-ები აჩვენებს აქტიურ კატეგორიას
- ✅ **რესპონსიული დიზაინი** - 4-სვეტიანი Grid layout

## სტრუქტურა (Structure)

### State Management

```javascript
const [activeButton, setActiveButton] = useState('Living Room')
```

- **activeButton** - ინახავს მიმდინარე აქტიურ კატეგორიას
- **საწყისი მნიშვნელობა**: 'Living Room'

### Data Arrays

#### 1. Living Room ავეჯი
```javascript
const livingRoom = [
    { name: "armchair", image: "/armchair.jpeg" },
    { name: "pouf", image: "/pouf.jpeg" },
    { name: "sofa", image: "/sofa.webp" },
    { name: "sidetable", image: "/sidetable.jpeg" },
    { name: "bookshelf", image: "/bookshelf.webp" },
    { name: "displaycabinet", image: "/displaycabinet.jpeg"},
    { name: "coffe table", image: "/cofetable.jpeg"},
    { name: "wall unit", image: "/wallunit.jpeg"}
]
```
**ელემენტების რაოდენობა**: 8

#### 2. Bedroom ავეჯი
```javascript
const bedroom = [
    { name: "bed", image: "/bed.jpg" },
    { name: "kidsbed", image: "/kidsbed.jpeg" },
    { name: "wardrobe", image: "/wardrobe.webp" },
    { name: "nightstand", image: "/nightstand.jpeg" },
    { name: "workdesk", image: "/workdesk.jpeg"},
    { name: "dressingtable", image: "/dressingtable.jpeg"},
    { name: "wall unit", image: "/wallunit.jpeg"}
]
```
**ელემენტების რაოდენობა**: 7

## UI კომპონენტები

### 1. Header სექცია

```jsx
<div className='flex justify-between items-center w-full px-20'>
    <div className='flex flex-col'>
        <p className={playfair.className + ' text-[45px] font-bold'}>
            Explore Our Featured Categories
        </p>
        <p className='max-w-[600px] text-gray-800'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
    </div>
    {/* ბათენები */}
</div>
```

**Styling დეტალები**:
- ფონტი: Playfair Display (45px, bold)
- Layout: Flexbox (space-between)
- Padding: px-20

### 2. Category Buttons

```jsx
<button 
    className={`${activeButton == 'Living Room' 
        ? 'bg-[rgb(43,139,136)] text-white' 
        : 'border border-[rgb(43,139,136)] text-[rgb(43,139,136)]'
    } hover:cursor-pointer px-4 py-2 rounded-[5px]`}
    onClick={() => setActiveButton('Living Room')}
>
    Living Room
</button>
```

**ბათენის სტილები**:
- **აქტიური**: მწვანე ფონი (`rgb(43,139,136)`), თეთრი ტექსტი
- **არააქტიური**: გამჭვირვალე ფონი, მწვანე border და ტექსტი
- **Hover**: cursor pointer
- **Border Radius**: 5px

### 3. Cards Grid

```jsx
<div className='grid grid-cols-4 gap-y-12 w-[85%] mt-22 px-20'>
    {activeButton === 'Living Room' && livingRoom.map((item) => (
        <div key={item.name} className='w-[320px]'>
            <Image 
                src={item.image} 
                alt={item.name} 
                width={350} 
                height={350} 
                className='rounded-[10px]' 
            />
            <p className='mt-2 text-[22px] text-gray-500'>
                {item.name}
            </p>
        </div>
    ))}
</div>
```

**Grid პარამეტრები**:
- **Columns**: 4
- **Gap Y**: 48px (gap-y-12)
- **Width**: 85%
- **Card Width**: 320px
- **Image Size**: 350x350px
- **Border Radius**: 10px

### 4. Progress Indicators

```jsx
<div className='flex gap-2 mt-5 mb-12 px-22 w-[82%]'>
    <hr className={`w-[33.3%] border-0 border-t-4 
        ${activeButton === 'Living Room' 
            ? 'border-[rgb(144,144,144)] rounded-l-[100px]' 
            : 'border-gray-300'
        }`} 
    />
    {/* 2 დამატებითი hr */}
</div>
```

**ინდიკატორის დეტალები**:
- **რაოდენობა**: 3 (თითო კატეგორიისთვის)
- **სიგანე**: თითო 33.3%
- **Gap**: 8px (gap-2)
- **აქტიური ფერი**: `rgb(144,144,144)` (მუქი რუხი)
- **არააქტიური ფერი**: `gray-300`
- **Border სისქე**: 4px
- **მომრგვალება**: 100px (მარცხენა მხარეს პირველისთვის)

## Styling Stack

### ფონტები
- **Playfair Display** - სათაურებისთვის (Google Fonts)
- წონები: 400, 500, 600, 700

### ფერების პალიტრა

| Element | Color | RGB Value |
|---------|-------|-----------|
| Active Button Background | Teal | `rgb(43,139,136)` |
| Active Button Text | White | - |
| Inactive Button Border | Teal | `rgb(43,139,136)` |
| Active Indicator | Gray | `rgb(144,144,144)` |
| Inactive Indicator | Light Gray | `gray-300` |
| Card Text | Gray | `gray-500` |

## Props

> **შენიშვნა**: ამ კომპონენტს არ აქვს props - ის არის standalone კომპონენტი

## გამოყენების მაგალითი (Usage)

```jsx
import Explore from '@/components/Explore'

export default function HomePage() {
    return (
        <main>
            <Explore />
        </main>
    )
}
```

## Dependencies

```json
{
    "next/image": "Next.js Image component",
    "react": "useState hook",
    "next/font/google": "Playfair Display font"
}
```

## ფაილის სტრუქტურა

```
src/
└── components/
    └── Explore.jsx (77 lines)
```

## Future Improvements

1. **Dining Room კატეგორია** - დაამატეთ `diningRoom` array
2. **Loading States** - დაამატეთ skeleton loader-ები
3. **Animations** - გადასვლის ანიმაციები კატეგორიებს შორის
4. **Responsive** - mobile და tablet ვერსიები
5. **Accessibility** - ARIA labels და keyboard navigation

## ხშირად დასმული კითხვები (FAQ)

**Q: როგორ დავამატო ახალი კატეგორია?**  
A: შექმენით ახალი array (მაგალითად `diningRoom`), დაამატეთ ბათენი და შესაბამისი conditional rendering cards grid-ში.

**Q: როგორ შევცვალო ფერები?**  
A: შეცვალეთ `rgb(43,139,136)` მნიშვნელობები ახალი ფერით.

**Q: რატომ არ მუშაობს `<hr>` ტეგებზე `rounded` კლასები?**  
A: `<hr>` ტეგებს აქვთ შეზღუდვები rounded corners-თან. უკეთესია გამოიყენოთ `<div>` ელემენტები `h-1` და `bg-*` კლასებით.

---

**Created**: 2025-12-24  
**Version**: 1.0  
**Component**: Explore.jsx
