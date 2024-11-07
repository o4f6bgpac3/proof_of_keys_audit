import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ChecklistApp = () => {
  const categories = {
    'Mac': [
      { id: 'A1', text: 'Full disk encryption' },
      { id: 'A2', text: 'File Vault recovery key accessible and legible' },
      { id: 'A3', text: 'Security key for 2FA' },
      { id: 'A4', text: 'Automatic screen lock set' },
      { id: 'A5', text: 'Find My Mac remote tracking and erasure' },
      { id: 'A6', text: 'Firewall enabled' },
      { id: 'A7', text: 'Automatic login disabled' },
      { id: 'A8', text: 'VPN connection' },
    ],
    'iPhone': [
      { id: 'B1', text: 'Face ID' },
      { id: 'B2', text: 'Full disc encryption' },
      { id: 'B3', text: 'Pass key' },
      { id: 'B4', text: 'Stolen phone protection on' },
      { id: 'B5', text: 'VPN connection' },
      { id: 'B6', text: 'Private Relay turned on' },
      { id: 'B7', text: 'USB restriction On' },
      { id: 'B8', text: 'Review app permissions for data access' },
    ],
    'iCloud': [
      { id: 'C1', text: 'Advanced data protection on' },
      { id: 'C2', text: 'Remove old devices' },
      { id: 'C3', text: 'Account recovery - Keys generated' },
      { id: 'C4', text: 'Account recovery - Keys stored in 2 separate locations and legible' },
      { id: 'C5', text: 'Access iCloud Data on web disabled' },
      { id: 'C6', text: 'Key Chain - No reused passwords' },
      { id: 'C7', text: 'Automatic timeout lock set' },
      { id: 'C8', text: 'Data wipe on failed attempts' },
    ],
    'Umbral Server & Bitcoin Node': [
      { id: 'D1', text: 'Tailscale mesh network between server and devices' },
      { id: 'D2', text: 'Tor enabled for routing internet traffic' },
      { id: 'D3', text: 'Bitcoin wallet backend connected to self hosted full node' },
    ],
    'Financial Apps & Websites': [
      { id: 'E1', text: 'Security keys for 2FA' },
      { id: 'E2', text: 'Add security keys for all financial accounts that provide it' },
      { id: 'E3', text: 'Create passkeys for all financial accounts that provide it' },
      { id: 'E4', text: 'Unique e-mail addresses used over all accounts' },
      { id: 'E5', text: 'Randomly generated alphanumeric passwords' },
    ],
    'Crypto Stuff': [
      { id: 'F1', text: 'Mnemonic\'s on steel and paper. Accessible & legible' },
      { id: 'F2', text: 'Hardware devises and encrypted USB stored in faraday box' },
      { id: 'F3', text: 'Perform simulated recovery of all hardware wallets' },
      { id: 'F4', text: 'Backup passphrases in 2 separate places as minimum' },
      { id: 'F5', text: 'Backup of multisig keystores in 2 separate locations as minimum' },
      { id: 'F6', text: 'Backup of multisig configuration files in 2 separate locations as minimum' },
      { id: 'F7', text: 'Multisig 2/2 with unique passphrase for both private keys' },
      { id: 'F8', text: 'Physical backups stored in tamper evident bags' },
      { id: 'F9', text: 'Emergency protocols / instructions' },
      { id: 'F10', text: 'Update Passwords annually' },
      { id: 'F11', text: 'All bitcoin not required for orders removed from exchanges' },
    ],
  };

  const [checklist, setChecklist] = useState({});
  const [showSavedAlert, setShowSavedAlert] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('proofOfKeysChecklist');
    if (saved) {
      setChecklist(JSON.parse(saved));
    }
  }, []);

  const handleCheck = (id) => {
    const newChecklist = { ...checklist, [id]: !checklist[id] };
    setChecklist(newChecklist);
    localStorage.setItem('proofOfKeysChecklist', JSON.stringify(newChecklist));
    setShowSavedAlert(true);
    setTimeout(() => setShowSavedAlert(false), 2000);
  };

  const calculateProgress = (items) => {
    const checked = items.filter(item => checklist[item.id]).length;
    return Math.round((checked / items.length) * 100);
  };

  const resetChecklist = () => {
    setChecklist({});
    localStorage.removeItem('proofOfKeysChecklist');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Annual Proof of Keys Audit</h1>
          <Button 
            variant="outline"
            onClick={resetChecklist}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {showSavedAlert && (
          <Alert className="fixed bottom-4 right-4 w-64">
            <Save className="h-4 w-4" />
            <AlertDescription>Progress saved</AlertDescription>
          </Alert>
        )}

        {Object.entries(categories).map(([category, items]) => (
          <Card key={category} className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-center">
                <span>{category}</span>
                <span className="text-sm font-normal text-gray-500">
                  {calculateProgress(items)}% complete
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() => handleCheck(item.id)}
                  >
                    {checklist[item.id] ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                    <span className={`flex-1 ${checklist[item.id] ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChecklistApp;
