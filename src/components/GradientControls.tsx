import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import './GradientControls.css';

interface GradientControlsProps {
  colors: string[];
  onColorChange: (index: number, color: string) => void;
  onAddColor: () => void;
  onRemoveColor: (index: number) => void;
  onReorderColors: (from: number, to: number) => void;
}

const GradientControls: React.FC<GradientControlsProps> = ({
  colors,
  onColorChange,
  onAddColor,
  onRemoveColor,
  onReorderColors
}) => {
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;
    onReorderColors(source.index, destination.index);
  };

  const removeColor = (index: number) => {
    if (colors.length > 1) onRemoveColor(index);
  };

  const renderColorRow = (
    color: string,
    index: number,
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot
  ) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`gradient-color-wrapper ${snapshot.isDragging ? 'dragging' : ''}`}
      style={{ ...provided.draggableProps.style, zIndex: snapshot.isDragging ? 1000 : undefined }}
    >
      <div className="gradient-color-inner">
        <div className="gradient-drag-handle">≡</div>
        <input
          type="color"
          value={color}
          onChange={(e) => onColorChange(index, e.target.value)}
          className="gradient-color-picker"
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onColorChange(index, e.target.value)}
          className="gradient-hex-input"
        />
        {colors.length > 1 && (
          <Trash2
            size={18}
            className="gradient-delete-inline"
            onClick={() => removeColor(index)}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="gradient-controls">
      <h3 className="gradient-title">Border Gradient</h3>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="colors"
          renderClone={(provided, snapshot, rubric) => {
            const color = colors[rubric.source.index];
            return renderColorRow(color, rubric.source.index, provided, snapshot);
          }}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {colors.map((color, i) => (
                <Draggable key={i} draggableId={`color-${i}`} index={i}>
                  {(prov, snapshot) => renderColorRow(color, i, prov, snapshot)}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button type="button" className="gradient-add-color" onClick={onAddColor}>
        <Plus size={16} /> Add Color
      </button>

      <div className="gradient-preview-section">
        <label className="gradient-label">Preview</label>
        <div
          className="gradient-preview"
          style={{ background: `linear-gradient(135deg, ${colors.join(', ')})` }}
        />
      </div>
    </div>
  );
};

export default GradientControls;
