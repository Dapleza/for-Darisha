document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.getElementById('timeline');
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const welcomeScreen = document.getElementById('welcomeScreen');

    document.body.style.overflow = 'hidden';

    musicToggle.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggle.classList.add('playing');
            musicToggle.innerHTML = '🔊 Выключить музыку';
        } else {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '🎵 Включить музыку';
        }
    });

    const hideWelcomeScreen = () => {
        welcomeScreen.classList.add('hidden');
        setTimeout(() => {
            document.body.style.overflow = 'auto';
            welcomeScreen.style.display = 'none';
        }, 1000);
    };

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            hideWelcomeScreen();
        }
    });
    welcomeScreen.addEventListener('click', hideWelcomeScreen);

    function getMediaType(filename) {
        const extension = filename.split('.').pop().toLowerCase();
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        const videoExtensions = ['mp4', 'webm', 'ogg', 'avi', 'mov'];

        if (imageExtensions.includes(extension)) {
            return `image/${extension}`;
        }
        if (videoExtensions.includes(extension)) {
            return `video/${extension}`;
        }
        return null;
    }

    const events = [
        {
            title: "Наша первая встреча",
            description: "Это было незабываемое знакомство, которое изменило всю нашу жизнь",
            date: "2022-05-15",
            media: "vk.png"
        },
        {
            title: "С Днем Рождения, моя Дариша! 🎂",
            description: `
        Моя любимая!
        
        Ты - мой самый лучший подарок. 
        Просто быть с тобой - 
        мое самое яркое счастье.
        
        Ты делаешь каждый день особенным, 
        даже когда просто рядом.
        Твоя улыбка - мое солнце, 
        твое тепло - мой дом.
        
        Ты - мое главное чудо. 
        Пусть вся твоя жизнь будет такой же 
        невероятной, как ты ❤️`,
            date: null,
            specialClass: "birthday-magic-message"
        }
    ];

    class TimelineManager {
        constructor(timelineElement) {
            this.timeline = timelineElement;
            this.loadEvents();
            this.setupScrollAnimation();
        }

        loadEvents() {
            events.sort((a, b) => {
                if (!a.date) return 1;
                if (!b.date) return -1;
                return new Date(a.date) - new Date(b.date);
            }).forEach(event => this.addEvent(event));
        }
        
        addEvent(event) {
            const container = document.createElement('div');
            container.className = 'container';
        
            const content = document.createElement('div');
            content.className = 'content';
            
            if (event.specialClass) {
                content.classList.add(event.specialClass);
            }
        
            const title = document.createElement('h2');
            title.textContent = event.title;
            content.appendChild(title);
        
            const description = document.createElement('p');
            description.textContent = event.description;
            content.appendChild(description);
        
            if (event.date) {
                const date = document.createElement('p');
                date.textContent = new Date(event.date).toLocaleDateString();
                content.appendChild(date);
            }
        
            if (event.media) {
                const mediaType = getMediaType(event.media);
                let media;
                
                if (mediaType && mediaType.startsWith('image')) {
                    media = document.createElement('img');
                    media.src = event.media;
                    media.alt = event.title;
                    media.onerror = () => {
                        console.error('Ошибка загрузки изображения:', event.title);
                        media.src = 'placeholder.jpg';
                    };
                } else if (mediaType && mediaType.startsWith('video')) {
                    media = document.createElement('video');
                    media.controls = true;
                    media.src = event.media;
                    media.onerror = () => {
                        console.error('Ошибка загрузки видео:', event.title);
                    };
                }

                if (media) {
                    media.classList.add('event-media');
                    content.appendChild(media);
                }
            }            
        
            container.appendChild(content);
            this.timeline.appendChild(container);
        }

        setupScrollAnimation() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            }, {
                threshold: 0.1
            });

            const containers = this.timeline.querySelectorAll('.container');
            containers.forEach(container => {
                observer.observe(container);
            });
        }
    }

    new TimelineManager(timeline);
});