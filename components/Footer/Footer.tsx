import css from './Footer.module.css';
export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Bogdan Tykhonenko</p>
          <p>
            Contact us:
            <a href="mailto:bogdan.tykhonenko.dev@gmail.com">
              bogdan.tykhonenko.dev@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
