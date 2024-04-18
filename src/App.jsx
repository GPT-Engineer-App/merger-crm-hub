import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Star } from "lucide-react";
import "./App.css";

const companies = [
  { id: 1, name: "Acme Inc.", website: "https://www.acme.com" },
  { id: 2, name: "Globex Corporation", website: "https://www.globex.com" },
  { id: 3, name: "Soylent Corp", website: "https://www.soylent.com" },
  { id: 4, name: "Initech", website: "https://www.initech.com" },
  { id: 5, name: "Umbrella Corporation", website: "https://www.umbrella.com" },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [notes, setNotes] = useState("");
  const [favorites, setFavorites] = useState([]);

  const filteredCompanies = companies.filter((company) => company.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleFavorite = (companyId) => {
    if (favorites.includes(companyId)) {
      setFavorites(favorites.filter((id) => id !== companyId));
    } else {
      setFavorites([...favorites, companyId]);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-3xl font-bold">M&A CRM</h1>
      <Input type="text" placeholder="Search companies..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mb-4 w-full" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCompanies.map((company) => (
          <Card key={company.id}>
            <CardHeader>
              <CardTitle>{company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
                <Button variant="ghost" onClick={() => toggleFavorite(company.id)} className="p-0">
                  <Star className={`h-5 w-5 ${favorites.includes(company.id) ? "fill-current text-yellow-500" : ""}`} />
                </Button>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-4">
                    Take Notes
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Notes for {company.name}</DialogTitle>
                    <DialogDescription>Enter any notes or information about the company.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="notes" className="text-right">
                        Notes
                      </Label>
                      <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setSelectedCompany(null)}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
