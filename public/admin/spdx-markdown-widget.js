// SPDX-FileCopyrightText: 2025 Basingstoke Repair Network <dev@basingstoke.repair>
// SPDX-License-Identifier: CC0-1.0

// Simple text input widget that handles SPDX headers
var SPDXTextControl = createClass({
  getInitialState: function() {
    // Extract existing SPDX headers or use default
    const spdxPattern = /<!--\s*SPDX-FileCopyrightText:.*?SPDX-License-Identifier:.*?-->/s;
    const match = (this.props.value || '').match(spdxPattern);
    
    const defaultHeaders = `<!--
SPDX-FileCopyrightText: 2025 Basingstoke Repair Network <dev@basingstoke.repair>

SPDX-License-Identifier: CC0-1.0
-->`;
    
    return {
      spdxHeaders: match ? match[0] : defaultHeaders
    };
  },

  handleChange: function(e) {
    const combined = this.state.spdxHeaders + '\n\n' + e.target.value;
    this.props.onChange(combined);
  },

  render: function() {
    // Extract content without SPDX headers for display
    const spdxPattern = /<!--\s*SPDX-FileCopyrightText:.*?SPDX-License-Identifier:.*?-->/s;
    const displayValue = (this.props.value || '').replace(spdxPattern, '').trim();
    
    return h('div', {},
      h('div', { 
        style: { 
          marginBottom: '8px', 
          padding: '8px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '4px',
          fontSize: '12px',
          color: '#666'
        }
      }, 'SPDX licensing headers are automatically managed'),
      h('textarea', {
        id: this.props.forID,
        className: this.props.classNameWrapper,
        value: displayValue,
        onChange: this.handleChange,
        rows: 10,
        style: { width: '100%', fontFamily: 'monospace' }
      })
    );
  }
});

var SPDXTextPreview = createClass({
  render: function() {
    // Extract content without SPDX headers for preview
    const spdxPattern = /<!--\s*SPDX-FileCopyrightText:.*?SPDX-License-Identifier:.*?-->/s;
    const content = (this.props.value || '').replace(spdxPattern, '').trim();
    
    return h('div', { 
      style: { 
        whiteSpace: 'pre-wrap',
        fontFamily: 'inherit'
      }
    }, content);
  }
});

CMS.registerWidget('spdx-markdown', SPDXTextControl, SPDXTextPreview);
