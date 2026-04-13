import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Pipeline Builder</h1>
      </header>
      <PipelineToolbar />
      <div className={styles.canvasWrapper}>
        <PipelineUI />
      </div>
      <footer className={styles.footer}>
        <SubmitButton />
      </footer>
    </div>
  );
}

export default App;
