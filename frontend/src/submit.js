// submit.js

import { useStore } from './store';
import styles from './submit.module.css';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Display user-friendly alert
            const dagStatus = data.is_dag ? 'Yes ✅' : 'No ❌';
            alert(
                `Pipeline Summary:\n\n` +
                `Nodes: ${data.num_nodes}\n` +
                `Edges: ${data.num_edges}\n` +
                `DAG: ${dagStatus}`
            );
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(
                `Error submitting pipeline:\n\n` +
                `${error.message}\n\n` +
                `Please ensure the backend server is running on http://localhost:8000`
            );
        }
    };

    return (
        <div className={styles.submitContainer}>
            <button
                type="button"
                className={styles.submitButton}
                onClick={handleSubmit}
            >
                Submit Pipeline
            </button>
        </div>
    );
}
