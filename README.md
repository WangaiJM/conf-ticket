# Conference Ticket Form

The project is part of my frontend mentor journey. The objective of the exercise today is to understand forms. Data Collection and validation. I'll be using react-typescript and sass for styling.

I will be handling data in three phases: collection, validation and presentation.

## challenge

When decinding font-size, usually i have to think of text-presets ahead. The challenge then becomes deciding between text-preset as utility classes or mixins. When is the best use case for each. In this challenge, I have been provided text-preset and text-preset mobile thus i think mixin is the best option since i can use $media as argument and if

```
@mixin text-preset-1($media){
    @if $media == "desktop"{
        font-size: var(--fs-1)
    }
    @else if $media == "mobile"{
        font-size: var(--fs-1-mobile)
    }
    font-weight: var(--fw-b);
    line-height: var(--lh-1);
}
```

otherwise I think i will end up with to many utility classes. If there is a better way, kindly advice.
Second, Is there a better formula to generate clamp() for font-sizes or an industry standard?

Data
Considering data is to be accessed by both the form component (to accept and store) and success component(to display). I believe the ideal location is to store globally and `useContext` to pass the data around.
