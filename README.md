# Conference Ticket Form

This project is part of my Frontend Mentor journey. The objective of this exercise is to understand forms—specifically data collection and validation. I am using React with TypeScript and Sass for styling.

I am handling data in three phases: collection, validation, and presentation.

## Challenge

When deciding on font sizes, I usually have to think about text presets in advance. The challenge then becomes choosing between using text presets as utility classes or as mixins. The question is: when is each approach most appropriate?

In this challenge, I was provided with both desktop and mobile text presets. Based on this, I think a mixin is the better option since I can pass `$media` as an argument:

```scss
@mixin text-preset-1($media) {
  @if $media == "desktop" {
    font-size: var(--fs-1);
  } @else if $media == "mobile" {
    font-size: var(--fs-1-mobile);
  }

  font-weight: var(--fw-b);
  line-height: var(--lh-1);
}
```

Otherwise, I think I will end up with too many utility classes. If there is a better way, I am open to advice.

Second, is there a better formula to generate `clamp()` values for font sizes, or is there an industry standard?

## Data

Since the data needs to be accessed by both the form component (to accept and store) and the success component (to display), I believe the ideal approach is to store it globally and use `useContext` to pass the data around.

I also need a variable to indicate when a ticket has been successfully generated, which will help switch between the form component and the success component.

Instead of mapping users directly to the success component—which would not reflect real-world behavior—I will create an ID for each user. When adding a user, I will assign a random (for this application) five-digit number as the ID. On success, I will use this number to find the user and display the ticket.

### Question

In a real-world system, if I search for a user’s ticket using the last entry, could there be a case where, between querying the last entry, someone else has registered, resulting in a different user being displayed?

## Overview

This challenge had more to learn than I originally expected. Key lessons:

- I now have a good grasp of `useContext`
- I learned how to handle file data and look forward to gaining more experience
- I am able to clearly handle the different levels of data:
  1. Data collection
  2. Data validation
  3. Data storage
  4. Data presentation

My focus has shifted more toward functionality over Sass. I will endeavor to find a better balance moving forward.

# Repository

For anyone who wants to go through the project:

[Conference Ticket Form Repository](https://github.com/WangaiJM/conf-ticket?utm_source=chatgpt.com)

### Live Site

[Conference Ticket Live Site](https://lighthearted-donut-61ba9b.netlify.app/)
